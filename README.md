# MERN blog frontend

Implement blog frontend part.

Functionality includes:
- register/login
- creating post
- editing post (only if you created this post)
- deleting post (only if you created this post)
- adding comment to post (only if you logged in)
- filter posts by tag

Register/Login pages have validation

Creating post screen includes markdown editor, you can type in markdown.

Each post has viewscount which updates each time someone goes to this post page.

Home page has 2 tabs (New and Popular), by clicking tab you can sort posts by creation date and viewscount respectively.

If you click the tag in tags section you will be redirected to page with posts including this tag

## Dependencies used

- react
- typescript
- redux toolkit
- material ui
- react-hook-horm
- yup
- react-markdown
- scss
- axios
- classnames
