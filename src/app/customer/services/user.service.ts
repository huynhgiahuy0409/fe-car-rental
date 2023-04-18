import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserDTO } from 'src/app/models/model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userBehaviorSubject!: BehaviorSubject<UserDTO | null>
  public user$!: Observable<UserDTO | null>
  constructor() {
    this.userBehaviorSubject = new BehaviorSubject<UserDTO | null>(null)
    this.user$ = this.userBehaviorSubject.asObservable()
    this.user$.subscribe(v => console.log(v));
  }
  public nextUser(user: UserDTO | null){
    this.userBehaviorSubject.next(user)
  }
}
