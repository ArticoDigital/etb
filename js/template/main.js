var debug=false;

//var canvas, stage, exportRoot;
var canvas=undefined;
var stage=undefined; 
var exportRoot=undefined;
var loader= undefined;

var flag1=false;
var flag2=false;

var page = 0;
var activities_done = 5;
var do_activities = false;
var total_pagers_bar = total_pages;
var no_cero = 0;
var slide = false;
var points = 0;
var show_finish_msg = false;
var processedUnload = false;
var reachedEnd = false;

var user_name;

var vistapagina=false;
//bookmark  lleva la pagina actual
//var suspend_data = "paginas::1,0,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,0,0::pos_evaluaciones::3,4,8,12,4::evaluaciones::0,0,0,0,0::porcentaje::20";
var completionStatus="Incomplete";
var suspend_data = "";
//var suspend_data="paginas::1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0::pag_evaluaciones::4,5,6::calificacion_evaluaciones::10,10,10::porcentaje_visto::0";
var separador = "::";
var suspend_data_visited = new Array();
var suspend_data_pos_eval;
var suspend_data_eval;
var suspend_data_porcentaje;

//PARAMETROS
var total_pages = 17; /*-- Modificar éste valor de acuerdo al número total de páginas menos 1--*/
var activity_flag=false; //variable que lleva true si esta en una actividad que no ha realizado el usuario
var array_menu=[4,5,6,7]; //menu central, paginas que debe ir
var pos_evaluaciones=[4,5,6]; //Posicion de las evaluaciones
var cal_evaluaciones=[0,0,0]; //Calificacion de las evaluaciones
var puntajepasa=59;  //porcentaje minimo para pasar una actividad individual dentro del recurso.
var button_pressed=false;



$(document).ready(function() {


	$('#btn_menu_hamb').on('click', function(e) {
		e.preventDefault();
		$('#menudesplegable').addClass("mostrar");
		$('#btn_cerrar').toggle();
		$('#btn_abrir').toggle();
    });

    $('.background').on('click', function(e) {
		e.preventDefault();
		escondermenu();
		

    });

  	function escondermenu(){
  		$('#menudesplegable').removeClass("mostrar");
		$('#btn_cerrar').toggle();
		$('#btn_abrir').toggle();
  	}
    $('#soundicon').on('click', function(e) {
        var bksound = document.getElementById("soundbackground");
        if(bksound.muted){
            bksound.muted = false;
        }
        else{
            bksound.muted= true;
        }
        $('#btn_sound').toggle();
        $('#btn_nosound').toggle();
        
    });

    $("#modal1").animatedModal({
                modalTarget:'animatedmodal1',
                animatedIn:'lightSpeedIn',
                animatedOut:'bounceOutDown',
                color:'#3498db',
                // Callbacks
                beforeOpen: function() {
                    console.log("The animation was called");
                },           
                afterOpen: function() {
                    console.log("The animation is completed");
                }, 
                beforeClose: function() {
                    console.log("The animation was called");
                }, 
                afterClose: function() {
                    console.log("The animation is completed");
                }
            });
      $("#modal2").animatedModal({
                modalTarget:'animatedmodal2',
                animatedIn:'lightSpeedIn',
                animatedOut:'bounceOutDown',
                color:'#3498db',
                // Callbacks
                beforeOpen: function() {
                    console.log("The animation was called");
                },           
                afterOpen: function() {
                    console.log("The animation is completed");
                }, 
                beforeClose: function() {
                    console.log("The animation was called");
                }, 
                afterClose: function() {
                    console.log("The animation is completed");
                }
            });
        $("#modal3").animatedModal({
                modalTarget:'animatedmodal3',
                animatedIn:'lightSpeedIn',
                animatedOut:'bounceOutDown',
                color:'#3498db',
                // Callbacks
                beforeOpen: function() {
                    console.log("The animation was called");
                },           
                afterOpen: function() {
                    console.log("The animation is completed");
                }, 
                beforeClose: function() {
                    console.log("The animation was called");
                }, 
                afterClose: function() {
                    console.log("The animation is completed");
                }
            });



    $('.next_button').on('click', function(e) {
		e.preventDefault();
        if (page <= (total_pages - 1) && !button_pressed) {
            button_pressed=true;
            if(activity_flag==false){
			

				//$('#page_' + page).css('display','none');
				page += 1;
            
            
				if(page==total_pages){
					var intervalosuma=suma(0, total_pages-1,suspend_data_visited);
					if(intervalosuma==total_pages-1){
						goToPage(page);
					}else{
						page-=1;
						swal({
						title: "Importante",
						text: "No has visto la totalidad del contenido, termina de ver todo el contenido para finalizar. Navega en el menú",
						type: "warning",
						
						confirmButtonColor: "#DD6B55",
						confirmButtonText: "Aceptar",
						},
						function(isConfirm){
							if (isConfirm) {
							  //swal("Deleted!", "Your imaginary file has been deleted.", "success");
							  //page = parseInt(bookmark, 10);
							  $('.menu').animate({left: '0%'}, 500);
							  $('.menu_barrier').fadeIn('normal');
							} 
						});
                    
					}
				}else if(page<total_pages){
					var intervalosuma2=suma(0, total_pages-1,suspend_data_visited);
					if(intervalosuma2==total_pages-1 && completionStatus=="Incomplete"){
					  //page=total_pages;
						if(!vistapagina){
							vistapagina=true;
							//alert("condicional2");
							goToPage(page);
						}else{							
						        swal({
						            title: "Aviso",
						            text: "Has visto todo el contenido de este módulo, Has clic en ¡Si! para finalizar el módulo",
						            type: "warning",
						            showCancelButton: true,
						            confirmButtonColor: "#DD6B55",
						            confirmButtonText: "¡Si!",
						            cancelButtonText: "No"
						          },
						          function(isConfirm){
						            if (isConfirm){
						            	page=total_pages;  
						              	goToPage(page);
						            } else {
						                 goToPage(page);
						            }
						          });
						}
					}else{
						goToPage(page);
					}
				}
            
				document.location.hash = "pagina_" + page;

			
				if (page == total_pages) {
					$('.next_button').addClass('button_off');
				}

			}else{ //Ingresa cuando es una actividad la que debe realizar
                swal({
                  title: "Importante",
                  text: "Debes realizar esta actividad para continuar",
                  timer: 3000,
                  showConfirmButton: false
                });
                button_pressed=false;
			}
        
        }
        
        $('.navegacion_progress_bar').css('z-index', 2);
	});

	$('.prev_button').on('click', function(e){
		e.preventDefault();
		if(page >= 1) {
			page -= 1;
			goToPage(page);
			

			document.location.hash = "pagina_" + page;

			if (page == 0) {
				
				disable_prev_btn();
			}

			
		}
		
	});

	$('.content-item-title a').on('click', function(e){
		e.preventDefault();
		
		$('.content-item-title a').removeClass('active');
		$(this).addClass('active');

		if ($(this).data('page') != total_pagers_bar) {

          //  if ($(this).data('page') < page) {

				page = $(this).data('page');
				goToPage(page);
			//} 
		} else if ($(this).data('page') == total_pagers_bar) {
			alert('No puede ir a la última página si no ha desarrollado todas las actividades.');
		}
		
		$('.advance_bar').width((page/total_pagers_bar)*100 + '%');


		/*$('.content-item-title a').each(function(index, el) {
			if($(this).data('page') == page) {
				$('.menu ul li a').removeClass('active');
				$('.menu ul li [data-page=' + page + ']').addClass('active');
			}
		});*/

		$('.prev_button').removeClass('button_off');

		$('.next_button').removeClass('button_off')
		

		if (page == 0) {
			$('.prev_button').addClass('button_off');
		}
		escondermenu();

		document.location.hash = "pagina_" + page;

	});
	

	$('.progress_bar .activities').each(function() {
		$(this).css('left',String(($(this).data('page')/total_pages)*100) + '%');
		$(this).removeClass('active');
		if($(this).data('page') == page) {
			$('.progress_bar .activities[data-page=' + page + ']').addClass('active');
		}

		document.location.hash = "pagina_" + page;
	});
	
    
  });  //END DOCUMENT READY
	
	


			


function goToPage(currentPage) {
	enable_prev_btn();
	enable_next_btn();
	
	
    cl.show();   //muestra el preloader 
    if(currentPage==0){
		disable_prev_btn();
	}
	var igp = currentPage; 
	var no_cerogp = igp;
	if (igp <= 9) {
		igp = String(igp);
	
	}
	
	$('.content1').html('<article id=\"page_' + no_cerogp + '\" class=\"page\"></article>');
    
	$('#page_' + no_cerogp).load('a' + igp + '.html', function(responseText, statusText, xhr) {
        if (statusText == "success") {
                       //alert("SUCCESS");
            $('#page_' + currentPage).css('display', 'block');
            
            //apadesapa();
            //desapa();
            
			flag1=true;
            preloadhide();
			//alert(suspend_data_visited);
            var posicioneval = evaluacion_arraypos_eval(currentPage);
			
            //alert(posicioneval);
            //alert(suspend_data_eval);
            if(posicioneval!==-1){
                //alert(suspend_data_eval[posicioneval]);
                var suspend_data_eval_number=parseInt(suspend_data_eval[posicioneval],10);
                var alerta="";
                //var suspend_data_eval_string=suspend_data_eval[posicioneval].toString();
                if(suspend_data_eval_number==0){
                    //alert("Debes realizar esta actividad para continuar");
                    activity_flag=true;
                    $('.next_button').addClass('button_off');
				}
					
            }else{
                activity_flag=false;
                suspend_data_visited[currentPage]=1;
				
            }
            
            if(page==total_pages){
                    alerta="Hemos llegado al final, descarga el certificado en esta página.";
                    swal({
                        title: "Aviso",
                        text: alerta,
                        type: "info",
                        confirmButtonText: "Aceptar"
                        }); 
                    completionStatus="Completed";
                    ScormProcessSetValue("cmi.completion_status", "completed");   

            }

            button_pressed=false;
            
            procesarPorcentajeSuspendData();
            //alert(suspend_data_porcentaje);
            //alert(suspend_data_visited);
            //alert(good_answered_8);
            
            setSuspendData(); //Escribe el suspenData tomando los arrays con los que se arma el srting.
            
            ScormProcessSetValue("cmi.location", currentPage); //Escribe el currentpage en el location del scorm
            
            showcurrentpage(); //Muestra la pagina actual en al usuario.
            setmenu_states();  //Actualiza los estados del menú de acuerdo a paginas visitadas , guardado en suspend_data
            set_actual_menu(currentPage);
            
            //cmi.progress_measure  o cmi.progress_measure
          

//            init();
        }

        button_pressed=false;
        if (statusText == "error") {
            alert("Error: " + xhr.status + " - " + xhr.statusText);
        }
        
	});  //END LOAD
		
}

 function evaluacion_arraypos_eval(pagina){
     //alert(pagina);
    var paginatext = pagina.toString();
     var evalarraypos=suspend_data_pos_eval.indexOf(paginatext);    
     return evalarraypos;
     }
	
	
function preloadhide() {
   if(flag1==true){
   cl.hide();
   flag1=false;
   
   }
    
}
      

function doStart() {
    if(debug){
     startTimeStamp = new Date();

    
        page = 0;
        fn_first_suspend_data();
        suspend_data_to_arrays();
        //showusername();
        getusername();

    goToPage(page);
    
    }else{
    //cl.hide();

    //record the time that the learner started the SCO so that we can report the total time
    startTimeStamp = new Date();

    //initialize communication with the LMS
    ScormProcessInitialize();

    //it's a best practice to set the completion status to incomplete when
    //first launching the course (if the course is not already completed)
    var completionStatus = ScormProcessGetValue("cmi.completion_status", true);
    if (completionStatus == "unknown") {
        completionStatus="Incomplete";
        ScormProcessSetValue("cmi.completion_status", "incomplete");
    }

    if(completionStatus=="completed"){
        $('.progress_bar .badged').addClass('finished');
        $('.badged .badged_icon .badged_icon_on').fadeIn('slow');
    }
   
    //see if the user stored a bookmark previously (don't check for errors
    //because cmi.location may not be initialized
    var bookmark = ScormProcessGetValue("cmi.location", false);
    var first_suspend_data = ScormProcessGetValue("cmi.suspend_data", false);
    getusername();
    //if there isn't a stored bookmark, start the user at the first page
    if (bookmark == "") {
        page = 0;
        continuarStart(first_suspend_data);
}
    else {
        
        swal({
            title: "Aviso",
            text: "¿Deseas iniciar desde el último lugar donde estuviste previamente?",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "¡Si!",
            cancelButtonText: "No"
          },
          function(isConfirm){
            if (isConfirm) {
              
              page = parseInt(bookmark, 10);
              continuarStart(first_suspend_data);
            } else {
                      
                      page = 0;
                      continuarStart(first_suspend_data);
            }
          });
    }
    
    }
}

function showusername(){
    var name_obj = document.getElementById("name_user");
    var name_user = ScormProcessGetValue("cmi.learner_name", true);
    
    
    if(name_user==null){

        name_user=""
        
    }
    name_obj.innerHTML = name_user;
    
    
   
    
}

function getusername(){
    //var name_obj = document.getElementById("name_user");
    //var name_user = ScormProcessGetValue("cmi.learner_name", true);
    var lastname_name = ScormProcessGetValue("cmi.learner_name", true);
    
    
    if(lastname_name==null){
        lastname_name="Apellido,Nombre";
        user_name="No registra";
        
    }
    var namearray=lastname_name.split(",");
    user_name = namearray[1]+" "+namearray[0];
    console.log(user_name);
    
}


function continuarStart(fstSD){
  if (fstSD == "") {
        fn_first_suspend_data();
    }else{
    suspend_data=fstSD;
    }
           //fn_first_suspend_data();
    suspend_data_to_arrays();
 
    //secuenciainicial();
    goToPage(page);

}

function procesarPorcentajeSuspendData(){
    var pag_visitadas=suma(0,suspend_data_visited.length,suspend_data_visited);
    var porcentaje=(pag_visitadas/(total_pages+1))*100;
    suspend_data_porcentaje=parseInt(porcentaje,10);
    
}

function procesarCalificacion(numeroevaluacion, puntajeposible,puntajeobtenido){
    //alert(numeroevaluacion+" "+ puntajeposible+" "+puntajeobtenido);
    var alertacalificion="";
    if(puntajeobtenido>0){
       
		//Se debe tener en cuenta que se debe habilitar el boton continuar para el usuario si ha respondio.
		//Se debe mostrar la calificacion pocentual al usuario
		//Se debe enviar el resultado por el suspend_data. 
		//Se debe actualizar el porcentaje de la calificacio total de acuerdo a la ponderacion
		var porcentaje=(puntajeobtenido/puntajeposible)*100;
		var activity_porcentaje=parseInt(porcentaje,10);
		/*alertacalificion="Para esta actividad has obtenido un puntaje de: "+activity_porcentaje+"%.";
		
		if(activity_porcentaje>=puntajepasa){
			swal({
								title: "¡Bien!",
								text: alertacalificion,
								type: "success",
								confirmButtonText: "Aceptar"
								});
		}else{
			swal({
								title: "¡Intentalo de nuevo!",
								text: alertacalificion,
								type: "error",
								confirmButtonText: "Aceptar"
								}); 
				
		}
		*/				
		var porcentajeprevio=parseInt(suspend_data_eval[numeroevaluacion-1],10);
		if(activity_porcentaje>porcentajeprevio){
			suspend_data_eval[numeroevaluacion-1]=activity_porcentaje;
			suspend_data_visited[suspend_data_pos_eval[numeroevaluacion-1]]=1;
			var score_ponderado=fn_calcular_score();
			score_ponderado=parseInt(score_ponderado,10);
			setSuspendData();
			setScore(score_ponderado);
		}
		enable_next_btn();
    }else{
        swal({
                        title: "¡Intentalo de nuevo!",
                        text: "Intentalo nuevamente para poder continuar.",
                        type: "error",
                        confirmButtonText: "Aceptar"
                        }); 
       
    }    
}

function disable_next_btn(){
	activity_flag=true;
	$('.next_button').addClass('button_off');
}
function enable_next_btn(){
	activity_flag=false;
	$('.next_button').removeClass('button_off');
}
function disable_prev_btn(){
	$('.prev_button').addClass('button_off');
}
function enable_prev_btn(){
	$('.prev_button').removeClass('button_off');
}


function fn_calcular_score(){
    
    var sumatotalscore=suma(0,suspend_data_eval.length,suspend_data_eval);
    //alert(sumatotalscore + " Total de los score");
    return sumatotalscore/suspend_data_eval.length;
}


//
function fn_first_suspend_data(){
    if (suspend_data == "") {
            suspend_data_visited[0]=1;
            for(var j=1;j<=total_pages;j++){
                suspend_data_visited[j]=0;  //Paginas visitadas en 1. 
            }

            suspend_data_pos_eval=pos_evaluaciones; //Posicion de las evaluaciones
            suspend_data_eval=cal_evaluaciones; //Calificacion de las evaluaciones
            suspend_data_porcentaje=0;  //Porcentaje navegado del curso
    }
    arrays_to_suspend_data();
}

function arrays_to_suspend_data(){
    var string_SD_visited = suspend_data_visited.toString();
    var string_SD_pos_eval = suspend_data_pos_eval.toString();
    var string_SD_eval = suspend_data_eval.toString();
    suspend_data="paginas"+separador+string_SD_visited;
    suspend_data+=separador+"pag_evaluaciones"+separador+string_SD_pos_eval;
    suspend_data+=separador+"calificacion_evaluaciones"+separador+string_SD_eval;
    suspend_data+=separador+"porcentaje_visto"+separador+suspend_data_porcentaje;
}
function suspend_data_to_arrays() {  //Convertir string a arreglo. 
//Forma con un solo arreglo, toma el sisppend data y lo convierte a datos array para manipular dentro del curso. 
    //var suspend_data = "paginas::1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,1,1,1::pos_evaluaciones::3,4,8,12,4::evaluaciones::0,0,0,0,0::porcentaje::20";
    var arreglo = suspend_data.split(separador);
    suspend_data_visited=arreglo[1].split(","); //Tomar cada posicion de datos (impares) y la conviertir en arreglo. ejemplo datos de evaluaciones
    suspend_data_pos_eval=arreglo[3].split(",");
    suspend_data_eval=arreglo[5].split(",");
    suspend_data_porcentaje=arreglo[7].split(",");
    
    //alert("LONG SUSPEND DATA ARRAY: "+ suspend_data_visited.length);
    //document.getElementById("demo2").innerHTML = evaluaciones[0]; //Valor de evaluacion 1.

}

function setSuspendData(){
    
     arrays_to_suspend_data();
     ScormProcessSetValue("cmi.suspend_data", suspend_data);
}

function setmenu_states(){
  
    var ini=0;
    var fin=0;
    var porcentaje=0;
    var comicsvistos=0;
    //$('.item-6').css('z-index',"10000");
    $('.item-6').css('display',"none");
    
    
    for(var i=0; i<array_menu.length-1; i++){
        //if(parseInt(suspend_data_visited[i],10)==1){

        comicsvistos+=parseInt(suspend_data_visited[array_menu[i]],10);

        //}
        /*ini=array_menu[i];
        if((i+1)>=array_menu.length){
            fin=total_pages;
        }else{
            fin=array_menu[i+1];
        }
        var intervalosuma=suma(ini, fin, suspend_data_visited);
        var diferencia=fin-ini;

        porcentaje=intervalosuma*100/diferencia;
        var porcentajeint=parseInt(porcentaje);

 		$('#progreso_'+i).css("width",porcentaje+"%");
 		$('#progreso_'+i).text(porcentajeint+"%");

 		if(porcentajeint==100){
 			$('#progreso_'+i).addClass("barraverde");

 		} 
        */       
    }    
    //alert( parseInt(suspend_data_visited[array_menu[array_menu.length-1]]));
    //alert(suspend_data_visited[array_menu[array_menu.length-1]]);
    console.log(suspend_data_visited);
    console.log(comicsvistos);
    if(comicsvistos==3){
        if(parseInt(suspend_data_visited[array_menu[array_menu.length-1]])==0){
            alertacalificion="Has terminado de ver los contenidos, busca las actividades de aprendizaje en la ciudad.";
        
            
            swal({
                                title: "¡Bien!",
                                text: alertacalificion,
                                type: "success",
                                confirmButtonText: "Aceptar"
                                });
        }

        $('.item-6').css('z-index',"10000");
        $('.item-7').css('width',"5%");
        $('.item-6').css('display',"block");
    }
}

function set_actual_menu(currentPage){
	var posicion=0;
		if(currentPage >= array_menu[array_menu.length-1]){
			posicion=array_menu.length-1;
		}else{
			for(var i=0; i<array_menu.length-1;i++){
			

				if(currentPage >= array_menu[i] && currentPage < array_menu[i+1]){
					posicion=i;
					i=array_menu.length;
				}

			}
		}
		$('.content-item-title a').removeClass('active');
		item_name="#item_"+posicion+" a";

		$(item_name).addClass('active');
}

function suma(ini, fin, vector){
    var sumatotal=0;
    for(var i=ini; i<fin;i++){
        sumatotal+=parseInt(vector[i],10);
    }
    return sumatotal;
}


function showcurrentpage(){
  txtcurrpage=page+1;
  totalpages=total_pages+1;
	  
  var numpage = document.getElementById("numpage");
  var cadenanumpage=txtcurrpage+" / "+totalpages;
  numpage.innerHTML = cadenanumpage;
}
 

function setScore(score) {
    if(!debug){
    ScormProcessSetValue("cmi.score.min", 0);
    ScormProcessSetValue("cmi.score.max", 100);
    ScormProcessSetValue("cmi.score.raw", score);
    //ScormProcessSetValue("cmi.score.scaled", score);
    
   /* if (score < 60) {
        ScormProcessSetValue("cmi.success_status", "failed");
    } else {
        ScormProcessSetValue("cmi.success_status", "passed");
    }*/

    ScormProcessCommit();
    return true;
    }
}


function getCurrentPage() {
    return page;
}

function setLocation(locationpage) {
    ScormProcessSetValue("cmi.location", locationpage);
    ScormProcessCommit();
    return true;
}


function scormcompleted() {
    completionStatus="Completed";
    ScormProcessSetValue("cmi.completion_status", "completed");
    ScormProcessCommit();
}



function doUnload(pressedExit) {

    //don't call this function twice
    if (processedUnload == true) {
        return;
    }

    processedUnload = true;
    //record the session time
    var endTimeStamp = new Date();
    var totalMilliseconds = (endTimeStamp.getTime() - startTimeStamp.getTime());
    var scormTime = ConvertMilliSecondsIntoSCORM2004Time(totalMilliseconds);

    ScormProcessSetValue("cmi.session_time", scormTime);


    //record the session time       
    //always default to saving the runtime data in this example
    ScormProcessSetValue("cmi.exit", "suspend");
    ScormProcessTerminate();
}



function ConvertMilliSecondsIntoSCORM2004Time(intTotalMilliseconds) {

    var ScormTime = "";

    var HundredthsOfASecond;	//decrementing counter - work at the hundreths of a second level because that is all the precision that is required

    var Seconds;	// 100 hundreths of a seconds
    var Minutes;	// 60 seconds
    var Hours;		// 60 minutes
    var Days;		// 24 hours
    var Months;		// assumed to be an "average" month (figures a leap year every 4 years) = ((365*4) + 1) / 48 days - 30.4375 days per month
    var Years;		// assumed to be 12 "average" months

    var HUNDREDTHS_PER_SECOND = 100;
    var HUNDREDTHS_PER_MINUTE = HUNDREDTHS_PER_SECOND * 60;
    var HUNDREDTHS_PER_HOUR = HUNDREDTHS_PER_MINUTE * 60;
    var HUNDREDTHS_PER_DAY = HUNDREDTHS_PER_HOUR * 24;
    var HUNDREDTHS_PER_MONTH = HUNDREDTHS_PER_DAY * (((365 * 4) + 1) / 48);
    var HUNDREDTHS_PER_YEAR = HUNDREDTHS_PER_MONTH * 12;

    HundredthsOfASecond = Math.floor(intTotalMilliseconds / 10);

    Years = Math.floor(HundredthsOfASecond / HUNDREDTHS_PER_YEAR);
    HundredthsOfASecond -= (Years * HUNDREDTHS_PER_YEAR);

    Months = Math.floor(HundredthsOfASecond / HUNDREDTHS_PER_MONTH);
    HundredthsOfASecond -= (Months * HUNDREDTHS_PER_MONTH);

    Days = Math.floor(HundredthsOfASecond / HUNDREDTHS_PER_DAY);
    HundredthsOfASecond -= (Days * HUNDREDTHS_PER_DAY);

    Hours = Math.floor(HundredthsOfASecond / HUNDREDTHS_PER_HOUR);
    HundredthsOfASecond -= (Hours * HUNDREDTHS_PER_HOUR);

    Minutes = Math.floor(HundredthsOfASecond / HUNDREDTHS_PER_MINUTE);
    HundredthsOfASecond -= (Minutes * HUNDREDTHS_PER_MINUTE);

    Seconds = Math.floor(HundredthsOfASecond / HUNDREDTHS_PER_SECOND);
    HundredthsOfASecond -= (Seconds * HUNDREDTHS_PER_SECOND);

    if (Years > 0) {
        ScormTime += Years + "Y";
    }
    if (Months > 0) {
        ScormTime += Months + "M";
    }
    if (Days > 0) {
        ScormTime += Days + "D";
    }

    //check to see if we have any time before adding the "T"
    if ((HundredthsOfASecond + Seconds + Minutes + Hours) > 0) {

        ScormTime += "T";

        if (Hours > 0) {
            ScormTime += Hours + "H";
        }

        if (Minutes > 0) {
            ScormTime += Minutes + "M";
        }

        if ((HundredthsOfASecond + Seconds) > 0) {
            ScormTime += Seconds;

            if (HundredthsOfASecond > 0) {
                ScormTime += "." + HundredthsOfASecond;
            }

            ScormTime += "S";
        }

    }

    if (ScormTime == "") {
        ScormTime = "0S";
    }

    ScormTime = "P" + ScormTime;

    return ScormTime;
}