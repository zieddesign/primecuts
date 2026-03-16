import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-splash-screen',
  imports: [],
  templateUrl: './splash-screen.html',
  styleUrl: './splash-screen.scss',
})
export class SplashScreen implements OnInit {
   constructor(private router: Router) {}

  ngOnInit(): void {
    // setTimeout(() => {
    //   this.router.navigate(['/language']);
    // }, 3000);
  }
}
