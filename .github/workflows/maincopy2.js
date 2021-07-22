window.onload = function () {
    let postType = "new";
    let arridpost = [];
    let date = new Date();
    let now_utc = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    let now_date = date.getDate() + " " + months[date.getMonth()] + " " + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    let now_datemini = date.getDate() + "/" + months[date.getMonth()] + "/" + date.getFullYear();
    let now_utcnew = (now_utc / 1000);
    let differencedateday = "";
    //console.log("data di oggi" + now_date);

    //    let orautc = Date.UTC(2021, 07, 01);
    //    let now_utc =  Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(),date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds());

    const dropdown = document.querySelector(".post-type");
    const container = document.querySelector(".post-container");

    elenco_post_reddit("ingrownhairs", 1);

    

    function elenco_post_reddit(subredditname, differencedateday){
    const renderPosts = (postType) => {

        //let arrsubreddit = ['models', 'sexygirls', 'bikini_celebs'];
        const subreddit = subredditname;

        fetch(`https://www.reddit.com/r/${subreddit}/${postType}.json`)
            .then(function (res) {
                // Return the response in JSON format
                return res.json();
            })
            .then(function (res) {
                // We render our posts to the UI in this block
                let currPost, markup = ``;
                // The array that contains our posts
                const postsArr = res.data.children;
                //let postArrVideo = "";
                // Add a title based on post type
                //console.log( postsArr.length);
                // Iterate through our posts array and chain
                // the markup based on our HTML structure
                for (let i = 0; i < postsArr.length; i++) {
//                    for (let i = 0; i < 2; i++) {
                        currPost = postsArr[i].data; // a single post object
                    let datapost = timeConverter(currPost.created_utc, "0");
                    let datapostmini = timeConverter(currPost.created_utc);
                    //console.log(currPost.id + "--" + arridpost[i] + "...." + arridpost);
                    //console.log(currPost.url.includes("www.reddit.com") + "---------------------------------------------------------------------------------------");

                    if (currPost.url.includes("gfycat") != true && currPost.url.includes("v.redd.it") != true && arridpost.includes(currPost.id) != true && currPost.url.includes("www.reddit.com") != true && currPost.url.includes("redgifs.com") != true ) {
//                        if (differencecontrol(datapostmini, now_datemini) == differencedateday && currPost.url.includes("gfycat") != true && currPost.url.includes("v.redd.it") != true && arridpost.includes(currPost.id) != true && currPost.url.includes("www.reddit.com") != true && currPost.url.includes("redgifs.com") != true ) {
                            arridpost.push(currPost.id,);
                        //console.log(currPost.url.includes("www.reddit.com") + "---------------------------------------------------------------------------------------");
                        //document.getElementById("geeks").innerHTML += arridpost + "<br>";
                        document.getElementById("geeks").innerHTML = "Sono presenti " + arridpost.length + " immagini<br>";
                        //elenco_post_reddit("http://www.facebook.com/sharer.php?u=https://modelsmust.blogspot.com/2021/07/elena.html&title=Elena");

                        //markup = `<h3>${postType} posts from r/${subreddit} </h3>`;
                        markup = ``;
                        markup += `
                            <a class="post" href="https://www.reddit.com/${currPost.permalink}">
                            <div class="title"> ${currPost.title} </div>
                            <div class="content"> 
                            <span>Giorno utc:___ ${now_utc}</span>
                            </br>
                            <span>Creazione utc: ${currPost.created_utc * 1000}</span>
                            </br>
                            <span>Creazione utc: ${datapost}</span>
                            </br>
                            <span>${postType} posts from r/${subreddit} </span>
                            </br>
                            ${currPost.selftext} <br>
                            <img src="${currPost.url}" style="width:400px;">
                            </br></br>
                            <span>${currPost.url}</span>
                            </br>
                            <span>Post id: ${currPost.id} </span>
                            </div>
                            <div class="author"> Posted by ${currPost.author} </div>
                            </a>`;
                        // Insert the markup HTML to our container
                        container.insertAdjacentHTML('afterbegin', markup);
                        //
                    }
                }
            })
            .catch(function (err) {
                console.log(err); // Log error if any
            });
    
        };

    // Load hot posts on page load
    renderPosts("hot");
    
}
}
//******************************************** FUNZIONI ******************************************************************************************** */
//---------------------------------This function send fetch-----------------------------------------------------------------------//    
                       /* function elenco_post_reddit(urlvar) {
                            //document.getElementById("conta").innerHTML = ++conteggio;
                            fetch(urlvar)
                            .then(response => {
                            console.log(response);
                            })
                            .catch(error => console.log("Si è verificato un errore!"))
                        }*/
//---------------------------------This function convert utc timestamp to date-----------------------------------------------------------------------//    
                        function timeConverter(UNIX_timestamp,set) {
                            var a = new Date(UNIX_timestamp * 1000);
                            var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                            var year = a.getFullYear();
                            var month = months[a.getMonth()];
                            var date = a.getDate();
                            var hour = a.getHours();
                            var min = a.getMinutes();
                            var sec = a.getSeconds();
                            if(set == "0"){
                                var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec;
                            } else {
                                var time = date + ' ' + month + ' ' + year;
                            }
                            return time;
                        }

//---------------------------------This function compare 2 date------------------------------------------------------------------------------------//    
                        function comparedata(datapost,now_date) {
                            var date1 = new Date(now_date);
                            var date2 = new Date(datapost);

                            //best to use .getTime() to compare dates
                            if (date1.getTime() === date2.getTime()) {
                                //same date
                                console.log("la data è uguale");
                            }

                            if (date1.getTime() > date2.getTime()) {
                                //date 1 is newer
                                console.log("la data di oggi è maggiore alla creazione");
                            }
                        }
//---------------------------------This function compare difference from 2 date-------------------------------------------------------------------//    
                        function differencecontrol(datapostmini,now_datemini) {
                            // To set two dates to two variables
                            var date1 = new Date(datapostmini);
                            var date2 = new Date(now_datemini);

                            // To calculate the time difference of two dates
                            var Difference_In_Time = date2.getTime() - date1.getTime();

                            // To calculate the no. of days between two dates
                            var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);

                            //To display the final no. of days (result)
                            /*document.write("Total number of days between dates  <br>"
                                + date1 + "<br> and <br>"
                                + date2 + " is: <br> "
                                + Difference_In_Days);*/
                                return Difference_In_Days;
                        }
//************************************************************************************************************************************************ */
