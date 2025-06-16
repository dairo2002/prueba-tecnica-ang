import { Component, AfterViewInit, OnInit } from '@angular/core';
import { UsersService } from '../../core/services/users.service';


@Component({
  selector: 'app-users',
  imports: [],
  templateUrl: './users.component.html',
  styleUrl: './users.component.sass'
})
export class UsersComponent implements OnInit{
  users: any[] = [];

  constructor(private userService: UsersService){}

  ngOnInit(): void {
    this.getUserList()      
  }

  getUserList(): void {
    this.userService.getUsers().subscribe({
      next: (data) => {
        this.users = data;
      },
      error: (err) => {
        console.log('error ', err);        
      }
    })
  }

}
