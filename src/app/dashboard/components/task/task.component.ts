import { Component, OnInit } from '@angular/core';
import { TasksService } from '../../../core/services/tasks.service';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [],
  templateUrl: './task.component.html',
  styleUrl: './task.component.sass'
})
export class TaskComponent implements OnInit {
  tasks: any[] = []

  constructor(private taskService: TasksService) { }

  ngOnInit(): void {
    this.listTask()
  }

  private listTask() {
    this.taskService.getTasks().subscribe({
      next: (data) => {
        this.tasks = data
      },
      error: (err) => {
        console.error('Error', err)
      }
    })
  }

}
