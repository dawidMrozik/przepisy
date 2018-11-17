import { Component, OnInit, Input } from '@angular/core';
import { Comment } from '../comment.interface';
import { CommentService } from '../comment.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  @Input() comment: Comment;
  @Input() userId: number;
  isOwner: boolean;
  editing: boolean = false;
  contentEditValue: string;

  constructor(private commentService: CommentService, private router: Router) { }

  ngOnInit() {
    this.checkIfOnwer();
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
    this.commentService.deleteComment(this.comment.id)
      .subscribe(
        () => {
          this.router.navigate(['/']);
        }
      );
  }

}
