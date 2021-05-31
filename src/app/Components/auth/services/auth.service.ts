import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { AuthResponse } from "../authResp.model";
import { User } from "../user.model";
import { environment } from '../../../../environments/environment';


@Injectable({providedIn: 'root'})
export class AuthService {

    user = new BehaviorSubject<User | null>(null);

    tokenExpirationTimer: any = null;

    constructor(private http: HttpClient, private router: Router){}


    retrieveLogin(){
        const loadedUserData = localStorage.getItem('user');
        if (loadedUserData === null) {
            return ;
        } 
        else {
            const user: {
                email: string,
                id: string,
                _token: string,
                _tokenExpirationDate: string
            } = JSON.parse(loadedUserData);

            const loadedUser = new User(user.email, user.id, user._token, new Date(user._tokenExpirationDate));
            if (loadedUser.token){
                const newExpDate = new Date(user._tokenExpirationDate).getTime() - new Date().getTime();
                this.autoLogout(newExpDate);
                this.user.next(loadedUser);
            }
            else {
                return;
            }
        }
    }


    logout(){
        localStorage.removeItem('user');
        this.user.next(null);
        if (this.tokenExpirationTimer){
            clearTimeout(this.tokenExpirationTimer);
        }  
        this.tokenExpirationTimer = null;
        this.router.navigate(['/auth']);
    }

    autoLogout(expiryTime: number){
        this.tokenExpirationTimer = setTimeout(() => {
            this.logout();
        }, expiryTime);
    }

    signup(email: string, password: string){
        return this.http.post<AuthResponse>(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.firebaseAPIkey}`, {
            email: email,
            password: password,
            returnSecureToken: true
        })
        .pipe(
            catchError(this.handleError), tap((respData: AuthResponse) => {
                this.handleAuthentication(respData.email, respData.localId, respData.idToken, respData.expiresIn);
            })
        );
    }

    login(email: string, password: string){
        return this.http.post<AuthResponse>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebaseAPIkey}`, {
            email: email,
            password: password,
            returnSecureToken: true
        })
        .pipe(
            catchError(this.handleError), tap((respData: AuthResponse) => {
                this.handleAuthentication(respData.email, respData.localId, respData.idToken, respData.expiresIn);
            })
          );
    }

    private handleAuthentication(email: string, userID: string, token: string, expiresIn: string){
        let expDate = new Date(new Date().getTime() + +expiresIn * 1000 )
        const user = new User(email, userID, token, expDate);
        localStorage.setItem('user', JSON.stringify(user));
        this.autoLogout(+expiresIn * 1000);
        this.user.next(user);
    }

    private handleError(errResp: HttpErrorResponse){
        let errorMessage = 'An unknown error occurred!';
        if (!errResp.error || !errResp.error.error) {
        return throwError(errorMessage);
        }

        switch (errResp.error.error.message) {
        case 'EMAIL_NOT_FOUND':
            errorMessage = 'There is no user record corresponding to this email.';
            break;
        case 'INVALID_PASSWORD':
            errorMessage = 'The entered password is invalid. Try again with different password.';
            break;
        default:
            errorMessage = 'An unknown error occurred!';
            break;
        }
        return throwError(errorMessage);
    }
}