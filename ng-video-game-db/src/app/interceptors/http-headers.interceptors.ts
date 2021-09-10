import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()

export class HttpHeadersInterceptor implements HttpInterceptor{
    constructor(){}

    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>>{
        req = req.clone({
            setHeaders: {
                'x-rapidapi-host': 'rawg-video-games-database.p.rapidapi.com',
                'x-rapidapi-key': '3269c22231msha600ba5e484260cp1b4bfcjsn5ad31f539994'
            },
            setParams:{
                key: '4f931ff8fca64f63bca93fb33045cbb3'
            }
        });
        return next.handle(req);
    }
}