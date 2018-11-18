import { Component, OnInit, Input } from '@angular/core';
import { Comment } from '../../models/comment.interface';
import { CommentService } from '../../services/comment.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {
  comments: Comment[];
  @Input() recipeId: number;
  @Input() userId: number;

  constructor(private commentService: CommentService) { }

  ngOnInit() {
    this.getComments(this.recipeId);
  }

  getComments(recipeId: number) {
    this.commentService.getComments(recipeId)
      .subscribe(
        (response: Response) => {
          this.comments = response['RecipeComments'];
        }
      );
  }

  

}
