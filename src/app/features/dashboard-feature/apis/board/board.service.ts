import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BoardModel } from '../../models/board.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BoardService {
  private http = inject(HttpClient);
  private baseUrl = 'https://localhost:5054/board-service/projects';

  constructor() {}

  getBoard(projectId: string, boardId: string): Observable<BoardModel> {
    return this.http.get<BoardModel>(
      `${this.baseUrl}/${projectId}/boards/${boardId}`
    );
  }

  getBoards(projectId: string): Observable<BoardModel[]> {
    return this.http.get<BoardModel[]>(`${this.baseUrl}/${projectId}/boards`);
  }

  createBoard(board: BoardModel): Observable<BoardModel> {
    return this.http.post<BoardModel>(
      `${this.baseUrl}/${board.projectId}/boards`,
      board
    );
  }

  updateBoard(board: BoardModel): Observable<BoardModel> {
    return this.http.put<BoardModel>(
      `${this.baseUrl}/${board.projectId}/boards`,
      board
    );
  }

  deleteBoard(projectId: string, boardId: string): Observable<any> {
    return this.http.delete<any>(
      `${this.baseUrl}/${projectId}/boards/${boardId}`
    );
  }
}
