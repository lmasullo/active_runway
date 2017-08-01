/* Runway.js - All the scripts for Active Runway ver.1.0 */

/*Before the index page loads it checks local storage for the how many runways, then displays the appropriate divs*/
$(document).on( 'pagebeforeshow' , '#pageIndex' ,function(event){

    //display the disclaimer the first time the application is opened
    //strDisclaimer = localStorage.Disclaimer;
    var storage = window.localStorage;//set the localStorage variable
    var strDisclaimer = storage.getItem('Disclaimer');// Pass a key name to get its value.
    if(strDisclaimer != "True"){
        //User has never viewed the disclaimer, so display
        //deprecated
        //$.mobile.changePage( "disclaimer.html", { transition: "slidedown"} );

        $( ":mobile-pagecontainer" ).pagecontainer( "change", "disclaimer.html", { transition: "slidedown" } );
    }

    var storage = window.localStorage;
    var strRway = storage.getItem('Runways');
    //strRway = localStorage.Runways;
    //var intRway = parseInt(strRway); //turn into a number
    //alert(strRway);
    //Only show the 2nd runway if it is set in the preferences
    if(strRway == "1"){
        document.getElementById("divTwo").style.display="none";
        document.getElementById("divTwo_b").style.display="none";
        document.getElementById("txtLand").style.display="none";
        document.getElementById("txtLand_2").style.display="none";
        //alert("test")
    }else if(strRway == "2"){
        document.getElementById("divTwo").style.display="inline";
        document.getElementById("divTwo_b").style.display="inline";
        document.getElementById("txtLand").style.display="block";
        document.getElementById("txtLand_2").style.display="block";
    }
});

  //Waits until page loads before firing these functions
  $(document).on("pagecreate", "#pageIndex", function () {

    /*Function to delete the disclaimer for testing */
    function fnLocal(){
        //store some data
        //localStorage.Disclaimer="False";//set the disclaimer to Not Viewed

        var storage = window.localStorage;
        storage.setItem('Disclaimer', 'False');
        alert("Local Storage Set to Not Viewed");
        //$.mobile.changePage( "about.html", { transition: "slideup"} );//go to index.html page
    }

      /*Substracts 1 from the Wind Direction*/
      $("#btnMinusWind").on("tap", function () {
          //$(this).hide();
          //alert('Test');
          var str1 = document.getElementById('txtWind').value; //get the value from Wind Direction
          var str2 = parseInt(str1); //turn into a number
          var strPlus = str2 - 1;
          //alert(strPlus);
          $("#txtWind").val(strPlus); //set Wind Direction with new value
          fnClear();
          $("#txtWind").slider("refresh");
      });

      /*Adds 1 to the Wind Direction*/
      $("#btnPlusWind").on("tap", function () {
          var str1 = document.getElementById('txtWind').value; //get the value from Wind Direction
          var str2 = parseInt(str1); //turn into a number
          var strPlus = str2 + 1;
          //alert(strPlus);
          $("#txtWind").val(strPlus); //set Wind Direction with new value
          fnClear();
          $("#txtWind").slider("refresh");
      });

      /*Substracts 1 from the Runway 1*/
      $("#btnMinusRway").on("tap", function () {
          var str1 = document.getElementById('txtA').value; //get the value from runway
          var str2 = parseInt(str1); //turn into a number
          var strMinus = str2 - 1;
          //alert(strMinusb);
          $("#txtA").val(strMinus); //set runway with new value
          fn180();
          $("#txtA").slider("refresh");
      });

      /*Adds 1 to the Runway 1*/
      $("#btnPlusRway").on("tap", function () {
          var str1 = document.getElementById('txtA').value; //get the value from runway
          var str2 = parseInt(str1); //turn into a number
          var strPlus = str2 + 1;
          //alert(strPlus);
          $("#txtA").val(strPlus); //set Runway with new value
          fn180();
          $("#txtA").slider("refresh");
      });

      /*Substracts 1 from the Runway 2*/
      $("#btnMinusRway_2").on("tap", function () {
          var str1 = document.getElementById('txtA_2').value; //get the value from runway
          var str2 = parseInt(str1); //turn into a number
          var strMinus = str2 - 1;
          //alert(strMinusb);
          $("#txtA_2").val(strMinus); //set runway with new value
          fn180_2();
          $("#txtA_2").slider("refresh");
      });

      /*Adds 1 to the Runway 2*/
      $("#btnPlusRway_2").on("tap", function () {
          var str1 = document.getElementById('txtA_2').value; //get the value from runway
          var str2 = parseInt(str1); //turn into a number
          var strPlus = str2 + 1;
          //alert(strPlus);
          $("#txtA_2").val(strPlus); //set Runway with new value
          fn180_2();
          $("#txtA_2").slider("refresh");
      });

      /*Fires the calculation functions*/
      $("#btnCalc").on("tap", function () {
          fnRway(document.getElementById('txtWind').value,document.getElementById('txtA').value,document.getElementById('txtB').value);

          fnRway2(document.getElementById('txtWind').value,document.getElementById('txtA_2').value,document.getElementById('txtB_2').value);
      });

      /*Fires the Reset the page function*/
      $("#btnReset").on("tap", function () {
          fnReset();
      });

      /*Fires the Clear function when wind slider is changed*/
      $("#txtWind").on("change", function () {
          fnClear();
      });

      /*Fires the 180 function when runway 1 number changed*/
      $("#txtA").on("change", function () {
          fn180();
      });

      /*Fires the 180 function when runway 2 number changed*/
      $("#txtA_2").on("change", function () {
          fn180_2();
      });

      /*Fires the calculation functions*/
      $("#btnLocal").on("tap", function () {
          fnLocal();
          //alert("Test Local");
      });

      /*function to clear and reset the sliders when change preferences*/
      function fnReset() {
          //runway 1 clearing
          document.getElementById('imgCheck').style.visibility = 'hidden'; //make check invisible
          document.getElementById('imgCheck2').style.visibility = 'hidden'; //make other check invisible
          document.getElementById('txtRway').innerHTML = ''; //make runway invisible
          document.getElementById('txtRway2').innerHTML = ''; //make runway invisible
          document.getElementById('txtOffset').innerHTML = ''; //make offset invisible
          document.getElementById('txtLand').innerHTML = ''; //make Landing Runway invisible
          //runway 2 clearing
          document.getElementById('imgCheck_2').style.visibility = 'hidden'; //make check invisible
          document.getElementById('imgCheck2_2').style.visibility = 'hidden'; //make other check invisible
          document.getElementById('txtRway_2').innerHTML = ''; //make runway invisible
          document.getElementById('txtRway2_2').innerHTML = ''; //make runway invisible
          document.getElementById('txtOffset_2').innerHTML = ''; //make offset invisible
          document.getElementById('txtLand_2').innerHTML = ''; //make Landing Runway invisible
          document.getElementById('txtLand_Final').innerHTML = ''; //make Final Runway invisible
          document.getElementById('txtLand_Final').innerHTML = ''; //make Final Runway invisible
          $("#txtWind").val(1).slider("refresh");
          $("#txtA").val(18).slider("refresh");
          $("#txtA_2").val(18).slider("refresh");
          $("#btnReset").removeClass("ui-btn-active");//prevents the reset button from staying active
      }

      /*function to clear the info when change wind direction*/
      function fnClear() {
          //runway 1 clearing
          document.getElementById('imgCheck').style.visibility = 'hidden'; //make check invisible
          document.getElementById('imgCheck2').style.visibility = 'hidden'; //make other check invisible
          document.getElementById('txtRway').innerHTML = ''; //make runway invisible
          document.getElementById('txtRway2').innerHTML = ''; //make runway invisible
          document.getElementById('txtOffset').innerHTML = ''; //make offset invisible
          document.getElementById('txtLand').innerHTML = ''; //make Landing Runway invisible
          //runway 2 clearing
          document.getElementById('imgCheck_2').style.visibility = 'hidden'; //make check invisible
          document.getElementById('imgCheck2_2').style.visibility = 'hidden'; //make other check invisible
          document.getElementById('txtRway_2').innerHTML = ''; //make runway invisible
          document.getElementById('txtRway2_2').innerHTML = ''; //make runway invisible
          document.getElementById('txtOffset_2').innerHTML = ''; //make offset invisible
          document.getElementById('txtLand_2').innerHTML = ''; //make Landing Runway invisible
          document.getElementById('txtLand_Final').innerHTML = ''; //make Final Runway invisible
          document.getElementById('txtLand_Final').innerHTML = ''; //make Final Runway invisible
      }

      /*function to get the reciprocal of runway 1 and display it in the 2nd drop down*/
      function fn180() {
          //alert("test");
          var str1 = document.getElementById('txtA').value; //get the value from the 1st runway
          var str2 = parseInt(str1); //turn into a number
          if (str2 <= 18) //add 18 if < 180 and subtract 18 if >
          {
              var str3 = str2 + 18;
          } else {
              var str3 = str2 - 18;
          }
          $("#txtB").val(str3);
          //runway 1 clearing
          document.getElementById('imgCheck').style.visibility = 'hidden'; //make check invisible
          document.getElementById('imgCheck2').style.visibility = 'hidden'; //make other check invisible
          document.getElementById('txtRway').innerHTML = ''; //make runway invisible
          document.getElementById('txtRway2').innerHTML = ''; //make runway invisible
          document.getElementById('txtOffset').innerHTML = ''; //make offset invisible
          document.getElementById('txtLand').innerHTML = ''; //make Landing Runway invisible
          //runway 2 clearing
          document.getElementById('imgCheck_2').style.visibility = 'hidden'; //make check invisible
          document.getElementById('imgCheck2_2').style.visibility = 'hidden'; //make other check invisible
          document.getElementById('txtRway_2').innerHTML = ''; //make runway invisible
          document.getElementById('txtRway2_2').innerHTML = ''; //make runway invisible
          document.getElementById('txtOffset_2').innerHTML = ''; //make offset invisible
          document.getElementById('txtLand_2').innerHTML = ''; //make Landing Runway invisible
          document.getElementById('txtLand_Final').innerHTML = ''; //make Final Runway invisible

          document.getElementById('txtLand_Final').innerHTML = ''; //make Final Runway invisible
          $("#txtB_2").trigger("refresh");
      }

      /*function to get the reciprocal runway and display it in the 2nd drop down*/
      function fn180_2() {
          //alert("test");
          var str1 = document.getElementById('txtA_2').value; //get the value from the 1st runway
          var str2 = parseInt(str1); //turn into a number
          if (str2 <= 18) //add 18 if < 180 and subtract 18 if >
          {
              var str3 = str2 + 18;
          } else {
              var str3 = str2 - 18;
          }
          $("#txtB_2").val(str3);
          //runway 1 clearing
          document.getElementById('imgCheck').style.visibility = 'hidden'; //make check invisible
          document.getElementById('imgCheck2').style.visibility = 'hidden'; //make other check invisible
          document.getElementById('txtRway').innerHTML = ''; //make runway invisible
          document.getElementById('txtRway2').innerHTML = ''; //make runway invisible
          document.getElementById('txtOffset').innerHTML = ''; //make offset invisible
          document.getElementById('txtLand').innerHTML = ''; //make Landing Runway invisible
          //runway 2 clearing
          document.getElementById('imgCheck_2').style.visibility = 'hidden'; //make check invisible
          document.getElementById('imgCheck2_2').style.visibility = 'hidden'; //make other check invisible
          document.getElementById('txtRway_2').innerHTML = ''; //make runway invisible
          document.getElementById('txtRway2_2').innerHTML = ''; //make runway invisible
          document.getElementById('txtOffset_2').innerHTML = ''; //make offset invisible
          document.getElementById('txtLand_2').innerHTML = ''; //make Landing Runway invisible
          document.getElementById('txtLand_Final').innerHTML = ''; //make Final Runway invisible

          document.getElementById('txtLand_Final').innerHTML = ''; //make Final Runway invisible
          $("#txtB_2").trigger("refresh");
      }

      /*Calculates the Best Runway 1*/
      function fnRway(a, b, c) //wind is a, 1st runway is b, 2nd runway is c
      {
          var strLength = document.getElementById('txtWind').value.length; //check the length of the wind field for validation
          var strRy = document.getElementById('txtA').value; //check the value of the 1st runway field for validation
          //alert(strLength);
          if (strLength == 0) {
              //alert("Please Enter the Wind Direction");
              $("#popWind").popup("open"); //opens jquery mobile popup div
              return false;
          } else if (strRy == "") {
              //alert("Please Choose a Runway");
              $("#popRun").popup("open");
              return false;
          }

          var strAdd = b * 10; //1st runway x 10 to get magnetic direction
          var diff = Math.abs(strAdd - a); //get absolute value difference from wind direction
          var strRnway = Math.min(360 - diff, diff); //gives the smaller of the two numbers
          document.getElementById('txtRway').innerHTML = strRnway; //puts the offset deg number in the 1st runway field

          var strAdd2 = c * 10; //repeats the above for the 2nd runway
          var diff2 = Math.abs(strAdd2 - a) % 360;
          var strRnway2 = Math.min(360 - diff2, diff2);
          document.getElementById('txtRway2').innerHTML = strRnway2;

          if (strRnway < strRnway2) //pick the best runway to land on, smallest offset number
          {
              document.getElementById('txtRway2').style.color = 'black'; //make other rway text black if was prev green
              document.getElementById('imgCheck2').style.visibility = 'hidden'; //make other check invisible
              document.getElementById('txtRway').style.color = 'green';
              document.getElementById('imgCheck').style.visibility = 'visible';
              document.getElementById('txtOffset').innerHTML = 'Offset Degrees';
              document.getElementById('txtLand').innerHTML = "1st Runway: "+b;
              document.getElementById('txtLand_Final').innerHTML = b;
          } else if (strRnway == strRnway2) //offset is 90deg, Pilot's choice
          {
              document.getElementById('txtRway').style.color = 'green';
              document.getElementById('imgCheck').style.visibility = 'visible';
              document.getElementById('txtRway2').style.color = 'green';
              document.getElementById('imgCheck2').style.visibility = 'visible';
              document.getElementById('txtOffset').innerHTML = 'Offset Degrees';
              document.getElementById('txtLand').innerHTML = "1st Runway: Pilot's Choice";
              document.getElementById('txtLand_Final').innerHTML = "Pilot's Choice";

          } else {
              document.getElementById('txtRway').style.color = 'black'; //make other rway text black if was prev green
              document.getElementById('imgCheck').style.visibility = 'hidden'; //make other check invisible
              document.getElementById('txtRway2').style.color = 'green';
              document.getElementById('imgCheck2').style.visibility = 'visible';
              document.getElementById('txtOffset').innerHTML = 'Offset Degrees';
              document.getElementById('txtLand').innerHTML = "1st Runway: "+c;
              document.getElementById('txtLand_Final').innerHTML = c;
          }

          //Only run if 2 runways are displayed
          if (strRway == 2){
              fnBest();//run the function that compares all the offsets and picks the best runway of all 4
          }
      }

      /*Calculates the Best Runway 2*/
      function fnRway2(a, b, c) //wind is a, 1st runway is b, 2nd runway is c
      {
          var strLength = document.getElementById('txtWind').value.length; //check the length of the wind field for validation
          var strRy = document.getElementById('txtA_2').value; //check the value of the 1st runway field for validation
          //alert(strLength);
          if (strLength == 0) {
              //alert("Please Enter the Wind Direction");
              $("#popWind").popup("open"); //opens jquery mobile popup div
              return false;
          } else if (strRy == "") {
              //alert("Please Choose a Runway");
              $("#popRun").popup("open");
              return false;
          }

          var strAdd = b * 10; //1st runway x 10 to get magnetic direction
          var diff = Math.abs(strAdd - a); //get absolute value difference from wind direction
          var strRnway = Math.min(360 - diff, diff); //gives the smaller of the two numbers
          document.getElementById('txtRway_2').innerHTML = strRnway; //puts the offset deg number in the 1st runway field

          var strAdd2 = c * 10; //repeats the above for the 2nd runway
          var diff2 = Math.abs(strAdd2 - a) % 360;
          var strRnway2 = Math.min(360 - diff2, diff2);
          document.getElementById('txtRway2_2').innerHTML = strRnway2;

          if (strRnway < strRnway2) //pick the best runway to land on, smallest offset number
          {
              document.getElementById('txtRway2_2').style.color = 'black'; //make other rway text black if was prev green
              document.getElementById('imgCheck2_2').style.visibility = 'hidden'; //make other check invisible
              document.getElementById('txtRway_2').style.color = 'green';
              document.getElementById('imgCheck_2').style.visibility = 'visible';
              document.getElementById('txtOffset_2').innerHTML = 'Offset Degrees';
              document.getElementById('txtLand_2').innerHTML = "2nd Runway: "+b;
          } else if (strRnway == strRnway2) //offset is 90deg, Pilot's choice
          {
              document.getElementById('txtRway_2').style.color = 'green';
              document.getElementById('imgCheck_2').style.visibility = 'visible';
              document.getElementById('txtRway2_2').style.color = 'green';
              document.getElementById('imgCheck2_2').style.visibility = 'visible';
              document.getElementById('txtOffset_2').innerHTML = 'Offset Degrees';
              document.getElementById('txtLand_2').innerHTML = "2nd Runway: Pilot's Choice";
          } else {
              document.getElementById('txtRway_2').style.color = 'black'; //make other rway text black if was prev green
              document.getElementById('imgCheck_2').style.visibility = 'hidden'; //make other check invisible
              document.getElementById('txtRway2_2').style.color = 'green';
              document.getElementById('imgCheck2_2').style.visibility = 'visible';
              document.getElementById('txtOffset_2').innerHTML = 'Offset Degrees';
              document.getElementById('txtLand_2').innerHTML = "2nd Runway: "+c;
          }

          //Only run if 2 runways are displayed
          if (strRway == 2){
              fnBest();//run the function that compares all the offsets and picks the best runway of all 4
          }

      }

      /*Function that compares the two landing results and picks the best*/
      function fnBest(){
          var str1 = document.getElementById('txtRway').innerHTML;//runway 1
          var str2 = document.getElementById('txtRway2').innerHTML;//runway 1 reciprocal
          var str3 = document.getElementById('txtRway_2').innerHTML;//runway 2
          var str4 = document.getElementById('txtRway2_2').innerHTML;//runway 2 recip
          var int1 = parseInt(str1); //turn into a number - Runway 1
          var int2 = parseInt(str2); //turn into a number - Runway 1
          var int3 = parseInt(str3); //turn into a number - Runway 2
          var int4 = parseInt(str4); //turn into a number - Runway 2
          //get the lowest number
          // initialize array
          var arr = [];
          // append new value to the array
          var totOffset = arr.push(int1,int2,int3,int4);
          var strMin = Math.min.apply(Math, arr);//gets the smallest number
          var strMax = Math.max.apply(Math, arr);//gets the largest number
          //alert(strMin);
          if (strMin == strMax){//if they are the same, all runways are equal
              document.getElementById('txtLand_Final').innerHTML = "Pilot's Choice";
          }else if (strMin == int1){
              document.getElementById('txtLand_Final').innerHTML = "Best: "+document.getElementById('txtA').value;
          }else if(strMin == int2){
              document.getElementById('txtLand_Final').innerHTML = "Best: "+document.getElementById('txtB').value;
          }else if(strMin == int3){
              document.getElementById('txtLand_Final').innerHTML = "Best: "+document.getElementById('txtA_2').value;
          }else if(strMin == int4){
              document.getElementById('txtLand_Final').innerHTML = "Best: "+document.getElementById('txtB_2').value;
          }
      }
  });//End Page Create pageIndex



  //Waits until Disclaimer page loads before firing these functions
  $(document).on("pageshow", "#pageDisclaimer", function () {

    //display the disclaimer I Agree button only the first time the application is opened
    var storage = window.localStorage;
    var strDisclaimer = storage.getItem('Disclaimer');
    //strDisclaimer = localStorage.Disclaimer;
    //alert(strDisclaimer);
    if(strDisclaimer == "True"){
      $('#btnAgree').addClass('ui-disabled');
      //Make already agreed message visible
      document.getElementById('divDisclaimer').innerHTML = 'You have already agreed, thanks!';
      document.getElementById('divDisclaimer').style.color = 'blue';
      //Make go back button visible
      document.getElementById('divBack').style.display = 'block';
    }


    $("#btnAgree").on("tap", function () {
        //store some data
        //localStorage.Disclaimer="True";//set the disclaimer to already viewed
        var storage = window.localStorage;
        //set the disclaimer to already viewed
        storage.setItem('Disclaimer', 'True');
        //go back to index.html
        $( ":mobile-pagecontainer" ).pagecontainer( "change", "index.html", { transition: "slideup" } );
    });
  });//End Page Create pageDisclaimer
