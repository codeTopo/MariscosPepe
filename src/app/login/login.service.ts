import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, tap, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { Login, Token } from './Models';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private tokenSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);
  private url = "api/user/validar"

  get token$(): Observable<string | null> {
    return this.tokenSubject.asObservable();
  }

  constructor(private http: HttpClient, private router: Router, private apiService: ApiService) {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      this.tokenSubject.next(storedToken);
    }
   }

  login(email: string, password: string): Observable<Token> {
    const body: Login = { email, password };
    return this.http.post<Token>(`${this.apiService.apiUrl}/${this.url}`, body, httpOptions)
      .pipe(
        tap((response: Token) => {
          // Almacenar el token en el localStorage
          localStorage.setItem('token', response.token);
          console.log(response);
          // Actualizar el BehaviorSubject con el nuevo token
          this.tokenSubject.next(response.token);
        }),
        catchError(this.handleError)
      );
  };

  isLoggedIn(): boolean {
    return localStorage.getItem('token') !== null;
  };


  logout(): void {
    // Elimina el token del localStorage
    localStorage.removeItem('token');
    // Actualiza el BehaviorSubject a nulo
    this.tokenSubject.next(null);
  };

  private handleError(error: HttpErrorResponse) {
    if (error.status === 400 && error.error?.errors) {
      // El servidor envió errores de validación
      return throwError(error.error.errors);
    } else {
      // Otro tipo de error
      console.error(error);
      return throwError('Error en el servidor. Por favor, intenta nuevamente.');
    }
  }
}
