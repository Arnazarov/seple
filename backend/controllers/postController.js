import Post from '../models/postModel.js';
import User from '../models/userModel.js';

// @desc    Fetch timeline posts
// @route   GET /api/posts/timeline/:id
// @access  Public
export const fetchTimelinePosts = async (req, res) => {
  try {
    const { id } = req.params;

    const currUser = await User.findById(id);

    if (currUser) {
      const currUserPosts = await Post.find({ userID: currUser._id });
      const followingUsersPosts = await Promise.all(
        currUser.following.map((id) => Post.find({ userID: id }))
      );

      res.status(200).json(currUserPosts.concat(...followingUsersPosts));
    } else {
      res.status(400).json({ message: 'User not found!' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Fetch posts of a single user
// @route   GET /api/posts/profile/:id
// @access  Public
export const fetchUserPosts = async (req, res) => {
  try {
    const { username } = req.params;
    const currUser = await User.findOne({ name: username });

    if (currUser) {
      const currUserPosts = await Post.find({ userID: currUser._id });
      res.status(200).json(currUserPosts);
    } else {
      res.status(400).json({ message: 'User not found!' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Fetch single post
// @route   GET /api/posts/:id
// @access  Public
export const fetchPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a post
// @route   POST /api/posts
// @access  Private
export const createPost = async (req, res) => {
  try {
    const post = new Post(req.body);

    const createdPost = await post.save();

    res.status(200).json(createdPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update a post
// @route   PUT /api/posts/:id
// @access  Private
export const updatePost = async (req, res) => {
  try {
    const {
      params: { id },
      body: { userID },
    } = req;
    const post = await Post.findById(id);

    if (post) {
      if (userID !== String(post.userID)) {
        return res
          .status(403)
          .json({ message: 'You can modify only your posts!' });
      }

      const newPost = Object.assign(post, req.body);
      delete newPost.userID;

      const updatedPost = await newPost.save();
      res.status(200).json(updatedPost);
    } else {
      res.status(400).json({ message: 'Post does not exist' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a post
// @route   DELETE /api/posts/:id
// @access  Private
export const deletePost = async (req, res) => {
  try {
    const {
      params: { id },
      body: { userID },
    } = req;
    const post = await Post.findById(id);

    if (post) {
      if (userID !== String(post.userID)) {
        return res
          .status(403)
          .json({ message: 'You can delete only your posts!' });
      }

      await post.remove();
      res.status(200).json({ message: 'Post deleted successfully!' });
    } else {
      res.status(400).json({ message: 'Post does not exist' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Like/Unlike a post
// @route   PUT /api/posts/:id/like
// @access  Private
export const likePost = async (req, res) => {
  try {
    const {
      params: { id },
      body: { userID },
    } = req;
    const post = await Post.findById(id);

    if (post) {
      if (post.likes.includes(userID)) {
        await post.updateOne({ $pull: { likes: userID } });
        res.status(200).json({ message: 'You have disliked this post!' });
      } else {
        await post.updateOne({ $push: { likes: userID } });
        res.status(200).json({ message: 'You have liked this post!' });
      }
    } else {
      res.status(400).json({ message: 'Post does not exist' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
