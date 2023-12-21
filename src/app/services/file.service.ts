// file.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FileService {
  private apiUrl = 'https://your-api-url';

  constructor(private http: HttpClient) {}

  readFile(): Observable<string> {
    return this.http.get(this.apiUrl, { responseType: 'text' });
  }

  writeFile(newContent: string): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/writeFile`, { newContent });
  }

  deleteFile(): Observable<string> {
    return this.http.delete<string>(`${this.apiUrl}/deleteFile`);
  }
//   Implement other methods like updateFile, deleteFromFile, etc.
}
