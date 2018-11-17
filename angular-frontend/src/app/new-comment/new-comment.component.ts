import { Component, OnInit } from '@angular/core';
import { CommentService } from '../comment.service';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-new-comment',
  templateUrl: './new-comment.component.html',
  styleUrls: ['./new-comment.component.css']
})
export class NewCommentComponent implements OnInit {
  userId: number;

  constructor(
    private commentService: CommentService,
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router
    ) { }

  ngOnInit() {
    this.authService.getUser()
    .subscribe(
      (response: Response) => {
        this.userId = response['User']['id'];
      }
    );
  }

  onSubmit(form: NgForm) {
    this.commentService.addComment(form.value.content, this.userId, this.route.snapshot.params['id'])
      .subscribe(
        () => {
          alert('Komentarz dodany! :)');
          this.router.navigate(['/przepis/' + this.route.snapshot.params['id']]);
        }
      );
    form.resetForm();
  }
}
