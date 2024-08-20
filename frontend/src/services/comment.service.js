import { httpService } from "./http.service";

class CommentService {
  // Retrieve all comments for a specific post
  async getPostComments(postId) {
    const response = await httpService.get(`comments/post/${postId}`);
    return response;
  }

  // Retrieve names of all commenters for a specific post
  async getPostCommentsNames(postId) {
    const response = await httpService.get(`comments/commentsnames/${postId}`);
    return response;
  }

  // Add a new comment to a specific post
  async addComment(body) {
    const response = await httpService.post("comments", body);
    return response;
  }

  // Delete a specific comment by its ID
  async deleteComment(commentId) {
    const response = await httpService.delete(`comments/${commentId}`);
    return response;
  }

  // Update a specific comment by its ID
  async updateComment(commentId, body) {
    const response = await httpService.patch(`comments/${commentId}`, body);
    return response;
  }

  // Add a reply to a specific comment
  async addReply(body) {
    console.log(body);
    const response = await httpService.post("comments/reply", body);
    return response;
  }

  // Like a specific comment by its ID
  async likeComment(commentId) {
    const response = await httpService.post(`comments/like/${commentId}`);
    return response;
  }

  // Dislike a specific comment by its ID
  async dislikeComment(commentId) {
    const response = await httpService.post(`comments/dislike/${commentId}`);
    return response;
  }
}



export const commentService = new CommentService();