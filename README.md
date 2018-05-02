# ReactSearchUI
React Search UI with pagination, stateless functional components, and dynamic rendering

<h2>Return Types</h2>
This is designed to interact with a database with three distict table types:<br>
products - (including multiple variations of a product with differing SKU's)<br>
"Resources" - blogs, downloadable pdfs, videos, and more each with their own unique link options.<br>
pages - general cms pages that have various sets of content.<br>
<br><br>
<h2>Language Handling</h2>
This UI also has handling for two languages currently, english and spanish. Presently, this is not scalable to include more languages.
<br><br>
<h2>Pagination</h2>
Pagination is currently still in development. For now, qty per page is hard coded to 50, but this is fairly easy to add.
<br><br>
<h2>TODO's</h2>
Of course, there's always improvements to be made.<br>
TODO: save common search terms using API<br>
TODO: save user path using API (when a user clicks on an entry, API saves search term and entry. If multiple users access the same search term and click on the same article, API increments relevance)<br>
TODO: Sort on relevance (occurances of search term and related words/synonymns and factor relevance above)<br>
TODO: handle "no results"<br>
TODO: add dynamic pagination (10,25,100 this particular implementation has over 12550 results, so "all" is not viable)<br>
TODO: Handle mistyping (Calculate Levenshtein Distance between search term and common search terms)<br>
TODO: AutoComplete <br>
TODO: Filter based on Type/category/additional info<br>
<br><br>
A development implementation exists online and link is available on request.
