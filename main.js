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
    let pos = "";

    const dropdown = document.querySelector(".post-type");
    const container = document.querySelector("#rowo");


    document.getElementById('num1').addEventListener('change', eventolistener);

   // document.getElementById('num2').addEventListener('change', function() {elenco_post_reddit(this.value, 1);});   
    //document.getElementById('num1').addEventListener('change', function() {add_fields();});   
    //document.getElementById('num2').addEventListener('change', function() {add_fields1();});   
 
  

//******************************************** FUNZIONI ******************************************************************************************** */
//---------------------------------This function list post reddit ----------------------------------------------------------------------------------//    
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
                // the markup based on our HTML structure
                for (let i = 0; i < postsArr.length; i++) {
                    currPost = postsArr[i].data; // a single post object
                    let datapost = timeConverter(currPost.created_utc, "0");
                    let datapostmini = timeConverter(currPost.created_utc);

                    if (differencecontrol(datapostmini, now_datemini) == differencedateday && currPost.url.includes("gfycat") != true && currPost.url.includes("v.redd.it") != true && arridpost.includes(currPost.id) != true && currPost.url.includes("www.reddit.com") != true && currPost.url.includes("redgifs.com") != true && currPost.url.includes("youtu.be") != true && currPost.url.includes("i.imgur.com") != true) {
                        arridpost.push(currPost.id,);
                        document.getElementById("geeks").innerHTML = "Sono presenti " + arridpost.length + " immagini<br>";
                        //document.getElementById("contoq").innerHTML = "Sono presenti " + arridpost.length + " immagini<br>";
                        markup = ``;
                        markup += `<div class="col-sm pos">
                                        <div class="title"> ${currPost.title} </div>
                                        <img src="${currPost.url}" style="width:200px;">
                                    </div>`;
                        container.insertAdjacentHTML('afterbegin', markup);
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
//---------------------------------funzione leggi cookie--------------------------------------------------------------------------------------------//    
                        function leggiCookie(nomeCookie){
                        if (document.cookie.length > 0)
                        {
                            var inizio = document.cookie.indexOf(nomeCookie + "=");
                            if (inizio != -1)
                            {
                            inizio = inizio + nomeCookie.length + 1;
                            var fine = document.cookie.indexOf(";",inizio);
                            if (fine == -1) fine = document.cookie.length;
                            return unescape(document.cookie.substring(inizio,fine));
                            }else{
                            return "";
                            }
                        }
                        return "";
                        }
                        //var nome = leggiCookie('mio_nome');
                        //document.write('Il tuo nome è: ' + nome);
//---------------------------------funzione verifica cookie-----------------------------------------------------------------------------------------//
                        function verificaCookie(){
                        document.cookie = 'verifica_cookie';
                        var testcookie = (document.cookie.indexOf('verifica_cookie') != -1) ? true : false;
                        return testcookie;
                        }
                        //var test = verificaCookie();
                        //if (test == true) alert('Il tuo browser accetta i cookie!');
                        //else alert('I biscotti non ti piacciono :-(');
//---------------------------------funzione cancella cookie-----------------------------------------------------------------------------------------//
                        function cencellaCookie(nomeCookie) {
                            scriviCookie(nomeCookie, '', -1);
                        }
                        //cancellaCookie('mio_nome');
//---------------------------------funzione scrivi cookie-------------------------------------------------------------------------------------------//
                        function scriviCookie(nomeCookie, valoreCookie, durataCookie) {
                            var scadenza = new Date();
                            var adesso = new Date();
                            scadenza.setTime(adesso.getTime() + (parseInt(durataCookie) * 60000));
                            document.cookie = nomeCookie + '=' + escape(valoreCookie) + '; expires=' + scadenza.toGMTString() + '; path=/';
                        }
                        //scriviCookie('mio_nome','massimiliano',60);
//---------------------------------funzione aggiungi campi-------------------------------------------------------------------------------------------//
                        function eventolistener() {
                            elenco_post_reddit(this.value, 1);
                            del_fields();
                            //add_fields();
                            document.getElementById('num1').addEventListener('change', eventolistener);
                        }

//---------------------------------funzione aggiungi campi-------------------------------------------------------------------------------------------//    
                        function del_fields() {
                            let d = document.getElementById("divtest");
                            let s = document.getElementById("room_fileds");
                            let valoreinput = document.getElementById("num1").value;
                            s.innerHTML += '<div id="numTesto">Inserito: ' + valoreinput + '<span id="contoq"></span></div>';
                            
/*                            if(d.innerHTML.includes("input") == true) {
                                d.innerHTML = '<div id="numTesto">Inserito: ' + valoreinput + '</div><br>';
                            } else {
                                d.innerHTML += '<div id="numTesto">Inserito: ' + valoreinput + '</div><br>';
                            }*/
                        }
//---------------------------------funzione aggiungi campi-------------------------------------------------------------------------------------------//    
                        function add_fields() {
                            let d = document.getElementById("divtest");
                            d.innerHTML += 'Insert subreddit: <input type="text" id="num1" name="num1" />';
                        }
//---------------------------------funzione aggiungi campi-------------------------------------------------------------------------------------------//    
                        let room = 1;
                        function add_fields1() {
                            room++;
                            let objTo = document.getElementById('room_fileds')
                            let divtest = document.createElement("div");
                            
                            divtest.innerHTML = '<div class="contentinput">Insert subreddit:<span><input type="text" id="num1" name="num1" onchange="checkInput(\'num3\');" /></span></div>';
                            //divtest.innerHTML = '<div class="label">Room ' + room +':</div><div class="content"><span>Width: <input type="text" style="width:48px;" name="width[]" value="" /><small>(ft)</small> X</span><span>Length: <input type="text" style="width:48px;" namae="length[]" value="" /><small>(ft)</small></span></div>';
                        
                            objTo.appendChild(divtest)
                        }
//---------------------------------funzione option --------------------------------------------------------------------------------------------------//    
                        function optionnumber(){
                            for (var b = 0; b <= 100; b++) {
                                selectmark = '<option val=' + b + '>' + b + '</option>';
                            }
                            return selectmark;
                        }
//---------------------------------This function check input value ----------------------------------------------------------------------------------//    
                        function checkInput(pos) {
                            add_fields();
                            document.getElementById(pos).disabled = true;
                            //var textInput = document.getElementById(textbox).value;
                            //console.log('You selected checkInput: ', pos);
                            //elenco_post_reddit(textbox, 1);
                            //alert(pos); 
                        }
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
}