import { Component, OnInit, Input } from '@angular/core';
import { Comment } from '../../models/comment.interface';
import { CommentService } from '../../services/comment.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  @Input() comment: Comment;
  @Input() userId: number;
  commentOwnerName: string;
  isOwner: boolean;
  editing: boolean = false;
  contentEditValue: string;

  constructor(private commentService: CommentService, private router: Router, private authService: AuthService) { }

  ngOnInit() {
    this.checkIfOnwer();
    this.authService.getUserById(this.comment.user_id)
      .subscribe(
        (response: Response) => this.commentOwnerName = response['User']['name']
      )
  }

  private checkIfOnwer() {
    this.comment.user_id == this.userId ? this.isOwner = true : this.isOwner = false;
  }

  onEdit() {
    this.editing = true;
    this.contentEditValue = this.comment.content;
  }

  onUpdate() {
    this.commentService.updateComment(this.comment.id, this.contentEditValue, this.userId, this.comment.recipe_id)
      .subscribe(
        (comment: Comment) => {
          this.comment = comment['Comment']
        }
      );
    this.editing = false;
  }

  onCancel() {
    this.editing = false;
  }

  onDelete() {
    if(confirm("Na pewno chcesz usunąć ten komentarz?")) {
      this.commentService.deleteComment(this.comment.id)
      .subscribe();
    }
  }
}
