import { Injectable } from '@angular/core';
import  Historia  from './historia.model';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';

@Injectable()
export class HistoriaService {
    private Url = 'http://localhost:3000/historias';

    constructor(private http: Http) { }
    
    public getHistoria(): Observable<Historia[]> {
            return this.http.get(this.Url)
            .map((response: Response) => response.json())
            //.do(data => console.log('All: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}