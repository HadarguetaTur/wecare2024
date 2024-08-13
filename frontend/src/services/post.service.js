import { httpService } from "./http.service";

class PostService {
  async getAllPosts() {
    const response = await httpService.get(`posts/`);
    return response;
  }
  async getPosts(filterBy, element) {
    let url = "posts";
    if (filterBy && element) {
      url += `/getposts/?${filterBy}=${element}`;
    }
    const response = await httpService.get(url);
    return response;
  }

  async getPostsByCategory(category) {
    const response = await httpService.get(`posts/category/${category}`);
    return response;
  }

  async createPost(body) {
    console.log(body instanceof FormData);
    const response = await httpService.post("posts", body);
    return response;
  }

  async getPostBySlug(slug) {
    console.log(slug);
    const response = await httpService.get(`posts/${slug}`);
    console.log(response);
    return response;
  }

  async updatePost(postId, body) {
    console.log(body instanceof FormData);
    const response = await httpService.patch(`posts/${postId}`, body);
    return response;
  }

  async getReactionsByUsername(username) {
    const response = await httpService.get(
      `/post/reactions/username/${username}`
    );
    return response;
  }

  async getPostReactions(postId) {
    const response = await httpService.get(`/post/reactions/${postId}`);
    return response;
  }

  async getSinglePostReactionByUsername(postId, username) {
    const response = await httpService.get(
      `/post/single/reaction/username/${username}/${postId}`
    );
    return response;
  }

  async getPostCommentsNames(postId) {
    const response = await httpService.get(`/post/commentsnames/${postId}`);
    return response;
  }

  async getPostComments(postId) {
    const response = await httpService.get(`/post/comments/${postId}`);
    return response;
  }

  async getPostsWithImages(page) {
    const response = await httpService.get(`/post/images/${page}`);
    return response;
  }

  async getPostsWithVideos(page) {
    const response = await httpService.get(`/post/videos/${page}`);
    return response;
  }

  async addReaction(body) {
    const response = await httpService.post("/post/reaction", body);
    return response;
  }

  async removeReaction(postId, previousReaction, postReactions) {
    const response = await httpService.delete(
      `/post/reaction/${postId}/${previousReaction}/${JSON.stringify(
        postReactions
      )}`
    );
    return response;
  }

  async addComment(body) {
    const response = await httpService.post("/post/comment", body);
    return response;
  }

  async deletePost(postId) {
    const response = await httpService.delete(`posts/${postId}`);
    return response;
  }
}

export const postService = new PostService();
