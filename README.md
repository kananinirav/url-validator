# URL validator

1. Created a web page with a simple text box (just one text box)

2. When the person enters a URL, as soon as they have completed the url and hit enter the URL will appear below the text box and the text box will be emptied again. It will only do this if it is a validly formed url, for example if someone writes ttjkl.145 this will not do anything as it is not a valid url. It will however accept any variations that are valid such as http://www.url.com or www.url.co.uk and url.com.au. And it will remove anything after the end of the country code for example if the person types www.abc.net/dlkjfk then only www.abc.net will be accepted

3. The URLS will be listed below the form and will appear one above each other, with the most recent urls at the top and will look very neat, and consistent, removing any www. or http from the url. Very important that they look neat and in a good position. Each new URL that is entered will appear above each other with the most recent ones at the top (unless they are a repeat)

4. The page will never refresh as everything is via javascript

5. Also the adding to the page will work via javascript, so the page will work even if the person is OFFLINE and all of the above functions will work even if the person is offline. It will try and sync with the database in the background every 15 seconds.
