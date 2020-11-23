// var verbi;
var app = {
    // Application Constructor

    initialize: function() {

      jQuery( ".pronome" ).each(function( index ) {

        //  console.log( index + ": " + jQuery( this ).attr("id") );
           jQuery( this ).html(pronomi[0][index]);
           jQuery( this ).attr("id",pronomi[1][index]);
           var pronmin=pronomi[0][index].toLowerCase();
           jQuery( this ).attr("name",pronmin);
        });


        jQuery( ".pd" ).each(function( index ) {

          //  console.log( index + ": " + jQuery( this ).attr("id") );
             jQuery( this ).html(pronomi_dir[0][index]);
             jQuery( this ).attr("id",pronomi_dir[1][index]);
             var pronmin=pronomi_dir[0][index].toLowerCase();
             jQuery( this ).attr("name",pronmin);
          });

          jQuery( ".pi" ).each(function( index ) {

            //  console.log( index + ": " + jQuery( this ).attr("id") );
               jQuery( this ).html(pronomi_indir[0][index]);
               jQuery( this ).attr("id",pronomi_indir[1][index]);
               var pronmin=pronomi_indir[0][index].toLowerCase();
               jQuery( this ).attr("name",pronmin);
            });

            jQuery( ".pc" ).each(function( index ) {

              //  console.log( index + ": " + jQuery( this ).attr("id") );
                 jQuery( this ).html(pronomi_doppi[0][index]);
                 jQuery( this ).attr("id",pronomi_doppi[1][index]);
                 var pronmin=pronomi_doppi[0][index].toLowerCase();
                 jQuery( this ).attr("name",pronmin);
              });

        jQuery( ".tempo" ).each(function( index ) {
          //    console.log( index + ": " + jQuery( this ).attr("id") );
             jQuery( this ).html(times[0][index]);
          });
        jQuery(".language").prepend(language);
        jQuery("#lessere").html(opzioniVerbo[1]);
        jQuery("#lpassivo").html(opzioniVerbo[2]);
        jQuery("#lriflessivo").html(opzioniVerbo[3]);
        //  jQuery(".language").append("<ul></ul>");
          for(x=1;x<4;x++) {

          jQuery(".menu-langs").append("<li lang='"+langs[x]+"' class='menu-item b_"+langs[x]+" menu-lang'>"+lang_names[x]+"<li>");

          }

        //  jQuery(".language").html(language);
          jQuery(".showtimes").html(showtimes);

        this.bindEvents();
        // console.log(verbi);
        /*   var versionCode = AppVersion.build
           console.log(versionCode)  */
    },

    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        var pronome = '';
        var tempo = '';
        var verbo = '';
        var riflessivo = '';
        var pronominale = '';
        var radice_reg = '';
        var irr;
        var passivo = 0;
        var v;
        var diff = '';
        var alias;
        var impersonale;
        var ling;
        var num_lang = 0;
        var aus;
        var tagliodes = 0;
        var declinazione;
        var vocali=["a","e","i","o","u"];
        var versione;
        var diretto;
        var indiretto;
        var illogic={io:"noi",tu:"voi",noi:"io",voi:"tu"};

        var pron_dir;
        var pron_indir;



        var coniugatore = {
          changeSettings:function() {


            jQuery(this).siblings().removeClass("selected");
            jQuery(this).toggleClass("selected");

            if(this.id=="showtimes") {
              if(jQuery(this).hasClass("selected")) {
                window.localStorage.setItem("showtimes", 1);
              } else {
                window.localStorage.setItem("showtimes", 0);
              }

            }

          //  window.localStorage.setItem(this, "value");
          },
            passatoMore: function() {

              var nome = [];
              var finale = [];
                var tot = passato2[passivo].length;

                for(x=0;x<tot;x++) {
                //  alert(x);
                //  alert(passato2[passivo][x]);
                finale[x]=coniugatore.calcola(passato2[passivo][x]);
                nome[x]=passato2[2][x];
                }
                // console.log(finale);
                 coniugatore.mostra(finale,nome,1);
                jQuery("#icon-more").css("display", "none");

            },

            cambiaRif: function() {
            // cambia rif è cambiato anche senza click indiretto

                jQuery("#riflessivo").siblings("label").toggleClass("ui-btn-active");
                jQuery("#passivo").prop("checked", false);
                jQuery("#passivo").siblings("label").removeClass("ui-btn-active");
                jQuery("#essere").prop("checked", false);
                jQuery("#essere").siblings("label").removeClass("ui-btn-active");

                jQuery("#imperativo").removeClass("disabilitato");

                // attivo
                if (jQuery("#riflessivo").is(":checked")) {
                  // toglie gli eventuali pronomi personali disabilitati (da pronomi d o ind)
                  jQuery(".pronome").removeClass("disabilitato");
                    indiretto=0;
                    aus = ausiliari[1];
                    coniugatore.disProIndir(true);

                    if(jQuery("#pd").is(":checked")) {
                      //
                      if (jQuery(".lista_pd").hasClass("show")) {
                        diretto=0;
                      }
                        coniugatore.disProDir("pd");

                    }
                  // disattivo
                } else {


                  // diretto deve rimanere sempre com'è
                  if(jQuery("#pd").is(":checked") && !jQuery("#pi").is(":checked")) {
                      // se disabilito un riflessivo e c'è un pd
                        if(v[0].trans!=2) {
                          coniugatore.disProDir("pc");
                          // deseleziono il pc
                        //  diretto=0;
                        }

                  }

                  if(v[0].aus!=ausiliari[1]) {
                    aus=ausiliari[0];
                  }
                }
                if (jQuery(".tempo").hasClass("ui-btn-active") && jQuery(".pronome").hasClass("ui-btn-active")) {
                //  console.log("inizio da riflessivo");
                    coniugatore.inizia();
                }

            },
            clickProDir: function() {
              // alert(pronome);


              jQuery("#pd").siblings("label").toggleClass("ui-btn-active");
              // azzera il pronome diretto selezionato
                  pron_dir='';
              // se lo attiva
              if(jQuery("#pd").is(":checked")) {

              jQuery("#imperativo").removeClass("disabilitato");

              // se è attivo il pronome indiretto, se è transitivo limitato o è attivo il riflessivo
              if(jQuery("#pi").is(":checked") || v[0].trans==2 || jQuery("#riflessivo").is(":checked")) {
                  coniugatore.disProDir("pd");

              } else {
                  coniugatore.disProDir("pc");
              }

              if(jQuery("#essere").is(":checked")) {
                  jQuery("#lessere").click();
              }

            } else {

              // se viene disattivato

                    coniugatore.disProDir("all");

                  if (jQuery(".tempo").hasClass("ui-btn-active") && jQuery("#verbo").val()) {
                        coniugatore.inizia();

                  }

              }


              if (jQuery("#passivo").is(":checked")) {
                jQuery("#passivo").prop("checked", false);
                jQuery("#passivo").siblings("label").removeClass("ui-btn-active");
                coniugatore.inizia();
              }

            },
            clickProIndir: function() {
              jQuery("#pi").siblings("label").toggleClass("ui-btn-active");
              jQuery(".lista_pi").toggleClass("show");
              // se i pd sono attivi inverte la barra dei pronomi
              indiretto=0;

              // se lo attiva
              // se c'è il pronome diretto questo sarà sempre deselezionato perché diventa doppio
              // a meno che non sia riflessivo in questo caso è già Doppio
              if(jQuery("#pi").is(":checked")) {

                      jQuery("#imperativo").removeClass("disabilitato");
                      riflessivo=0;

                      if(jQuery("#pd").is(":checked")) {
                        // non era riflessivo e non era doppio, diretto va deselezionato.

                        // se non è riflessivo diventa un pd / pi quindi diretto deve essere 0
                          if(!jQuery("#riflessivo").is(":checked")) {
                          //  alert("qui metto diretto 0");
                        //   diretto=0;
                            diretto=0;
                          }

                        coniugatore.disProDir("pd");

                        // qua deve iniziare

                      }


                      if(jQuery("#riflessivo").is(":checked")) {
                           jQuery("#lriflessivo").click();
                      }





              } else {
              // se viene disattivato
              // toglie la selezione al proprio pronominale


              jQuery(".pi").removeClass("ui-btn-active");
              indiretto=0;

                      if(jQuery("#pd").is(":checked")) {
                        if(v[0].trans!=2) {
                            diretto=0;
                            coniugatore.disProDir("pc");
                        } else {

                          coniugatore.disProDir("pd");
                        }

                      }

                }

            if (jQuery(".tempo").hasClass("ui-btn-active") && jQuery("#verbo").val()) {

                      coniugatore.inizia();

            }

            if (jQuery("#passivo").is(":checked")) {
              jQuery("#passivo").prop("checked", false);
              jQuery("#passivo").siblings("label").removeClass("ui-btn-active");
              coniugatore.inizia();
            }


            },
            disProDir: function(val="all", check=false) {
              switch(val) {
                case "pd":
                // nasconde il pd e mostra il pc
                jQuery(".lista_pd").removeClass("show");
                jQuery(".pd").removeClass("ui-btn-active");
                jQuery(".lista_pc").addClass("show");

                break;
                case "pc":
                // nasconde solo il pc
                jQuery(".lista_pc").removeClass("show");
                jQuery(".pc").removeClass("ui-btn-active");
                  jQuery(".lista_pd").addClass("show");
                break;
                case "all":
                // nasconde entrambi
                jQuery(".lista_pd").removeClass("show");
                jQuery(".pd").removeClass("ui-btn-active");
                jQuery(".lista_pc").removeClass("show");
                jQuery(".pc").removeClass("ui-btn-active");

                diretto=0;
              }

              if(check) {
                jQuery("#pd").prop("checked", false);
                jQuery("#pd").siblings("label").removeClass("ui-btn-active");

              }

            },
            disProIndir: function(check=false) {
              jQuery(".lista_pi").removeClass("show");
              jQuery(".pi").removeClass("ui-btn-active");
              indiretto=0;
              if(check) {
                jQuery("#pi").prop("checked", false);
                jQuery("#pi").siblings("label").removeClass("ui-btn-active");
              }
            },

            cambiaAus: function() {
                // console.log("cambio aus");
                //  jQuery("#passivo").prop("checked",false).checkboxradio("refresh");
                jQuery("#essere").siblings("label").toggleClass("ui-btn-active");
                jQuery("#passivo").prop("checked", false);
                jQuery("#passivo").siblings("label").removeClass("ui-btn-active");
                jQuery("#riflessivo").prop("checked", false);
                jQuery("#riflessivo").siblings("label").removeClass("ui-btn-active");
                jQuery("#imperativo").removeClass("disabilitato");

                if (jQuery("#essere").is(":checked")) {
                    aus = ausiliari[1];
                    coniugatore.disProDir("all",true);
                } else {
                    aus = ausiliari[0];
                }

                coniugatore.controllaImpersonale();
                if (jQuery(".tempo").hasClass("ui-btn-active") && jQuery(".pronome").hasClass("ui-btn-active") && jQuery("#verbo").val()) {
                    coniugatore.inizia();
                    //  console.log("ok sostituisco check");
                }
            },

            formaPassiva: function() {
                //  console.log("attivo passivo");
                // toglie il tasto essere per quei verbi che hanno anche l'essere semplice
                //    jQuery("#essere").prop("checked",false).checkboxradio("refresh");

                jQuery("#passivo").siblings("label").toggleClass("ui-btn-active");
                jQuery("#essere").prop("checked", false);
                jQuery("#riflessivo").prop("checked", false);
                jQuery("#essere").siblings("label").removeClass("ui-btn-active");
                jQuery("#riflessivo").siblings("label").removeClass("ui-btn-active");

                riflessivo = 0;


                // per rimettere avere nel caso sia deselezionato
                if (jQuery("#passivo").is(":checked")) {
                    //    console.log("essere");
                    aus = ausiliari[1];
                    // passivo non ha pronomi
                    jQuery("#imperativo").addClass("disabilitato");

                    pron_dir='';


                    coniugatore.disProDir("all",true);
                    coniugatore.disProIndir(true);


                } else {
                    aus = ausiliari[0];
                    jQuery("#imperativo").removeClass("disabilitato");
                }
                if (jQuery(".tempo").hasClass("ui-btn-active") && jQuery(".pronome").hasClass("ui-btn-active") && jQuery("#verbo").val()) {
                    coniugatore.inizia();
                    //  console.log("ok sostituisco check");
                }

            },
            calcolaNegazione:function(mylang, finale) {

              switch (mylang) {
                case "it":
                if(riflessivo==1||diretto==1) {
              //    finale = finale.substring(0, finale.length - 1);
                }
                return "non "+finale;
                break;
                case "es":
                return "no "+finale;
                break;
              }
            },
            regImperativoDoppio:function(verbo) {
              var verbo=verbo.split("'");
                if(riflessivo) {
                  return verbo[0]+"t";
                }
                if(indiretto && diretto) {
                  last=indiretti2[pron_indir].charAt(0);
                  if (['m', 't', 'l', 'c'].indexOf(last) >= 0) {
                    return verbo[0]+last;
                  }
                  return verbo[0];
                }
                if(indiretto) {
                  last=indiretti[pron_indir].charAt(0);
                  if (['m', 't', 'l', 'c'].indexOf(last) >= 0) {
                    return verbo[0]+last;
                  }

                }
                if(diretto) {
                  last=diretti[pron_dir].charAt(0);
                  if (['m', 't', 'l', 'c'].indexOf(last) >= 0) {
                    return verbo[0]+last;
                  }

                }
                return verbo[0];
            },
            calcolaImperativo:function(mylang,negativo) {

                switch (mylang) {

                  case "it":
                    if(negativo=="negativo" && pronome=="tu") {
                      return "infinito";
                    }


                    if(v[0].imperativo) {
                      if(v[0].imperativo[pronome]) {
                        return "imperativo";
                      }
                    }

                    if (pronome=="io" || pronome=="tu" || pronome=="voi") {
                      //  alert("è imperativo per er");
                        return "imperativo";
                      } else {

                        return "cp";
                      }
                      break;

                  case "fr":
                      if(v[0].imperativo) {
                      //  alert("è imperativo per irregolare");
                        return "imperativo";

                      } else if (declinazione=="er" && pronome=="tu") {
                      //  alert("è imperativo per er");
                        return "imperativo";
                      } else {
                        // alert("è presente");
                        return "presente";
                      }
                      break;
                  case "es":
                      // console.log("neg"+negativo);
                      if(pronome=="el" || pronome=="ellos" || pronome=="nos" || negativo=="negativo") {
                        return "cp";
                      }
                      if(pronome=="tu" || pronome=="vos") {
                        return "imperativo";
                      }
                      break;

                  default:
                      return "imperativo";


                }


              },
          creaGerundio:function(risultato) {
                  if(risultato[0]=="fc") {
                    return risultato[1];
                  } else {
                  //  console.log(are);
                    var gerundio=v[0].v+are[0].gerundio;
                    return gerundio;
                  }

            },
            // crea il participio
            creaParticipio: function(risultato, pronome, aus, radice, declinazione) {

                //console.log("radice passato"+radice);
                switch(mylang) {
                    case "fr":
                          if(v[0].hasOwnProperty("partf")) {
                      //    ripetuta è la lettera prima a fs fp
                      // ripetuta è l'ultima lettera che nel femminile è ripetuta
                                var ripetuta=v[0].partf;
                          } else if (risultato == "fc") {
                                var ripetuta=radice.slice(-1);
                          } else {
                                var ripetuta=decl[0].participio;
                          }


                          if(risultato=="fc") {
                         //   console.log(radice);
                            var msfinale=radice.slice(-1);
                          }

                         if(v[0].part) {
                             var msfinale=v[0].part.slice(-1);
                         }
                         // se l'ultima finale s mp va tolto
                          if(msfinale=="s") {
                            mp="";
                          }


                        break;

                    default:
                      var ripetuta="";

                }
              //  alert(radice);

                if(diretto) {
                    if(pron_dir=="io" || pron_dir=="tu") {
                      fin_passato = ms + "/" + ripetuta + fs;
                    } else if (pron_dir=="noi" || pron_dir=="voi") {
                      fin_passato = mp + "/" + ripetuta + fp;
                    } else if (pron_dir=="lui") {
                      fin_passato = ms;
                    } else if (pron_dir=="lei") {
                      fin_passato = fs;
                    } else if (pron_dir=="essi") {
                      fin_passato = mp;
                    } else if (pron_dir=="esse") {
                      fin_passato = fp;
                    }
                }

                if(!diretto) {
                // con ausiliare avere / non passivo o lingua inglese
                if ((aus == ausiliari[0] && passivo!=1)||mylang=="en"||impersonale == 2) {
                    fin_passato = ms;
                // ausiliare essere
                } else {
                    // io, tu, lei
                    if (pronome == pronomi[1][0] || pronome == pronomi[1][1]  || pronome == pronomi[1][2] ) {
                        // se è un impersonale totale non accetta altre forme

                      fin_passato = ms + "/" + ripetuta + fs;

                    // noi, voi, loro
                    } else {

                      fin_passato = mp + "/" + ripetuta + fp;
                    }


                }
              }
                // console.log(mp);

                if (risultato == "fc") {
                    var participio = radice + fin_passato;
                } else {
                    // prende il participio in base alla declinazione
                    decl = eval(declinazione);
                    var semifinale = decl[0].participio;

                    var participio = diff + radice + semifinale + fin_passato;

                }

                return participio;
            },

            guardaIrregolare: function(vb, tmp, pronome) {
            //console.log(tempo);
                var radice;
              //  console.log("sono dentro guardo irregolare" + radice_reg);
                //  console.log(vb);
              //  console.log(vb);
                /* lettura della voce de tempo */ ///

                // imposta il tempo futuro per quei valori che so già essere uguali a futuro di Condizionale

                if(tmp=="condizionale" && futurcond==1) {
                  var time="futuro";

                } else if (tmp=="cii" && mylang=="es") {

                  var time="ci";
                  console.log("cambio tempo");


                //  alert("condizionale");
                } else {
                  var time=tmp;
                }



                if (vb.hasOwnProperty(time)) {

                    if (vb[tmp] == "-2") {
                        return -2;
                    }

                    //console.log("ha il tempo"+tempo);
                    // contolla se il tempo ha una radice
                    /*** 1. RADICE controlla se il tempo ha una radice ****/
                    if (vb[time].hasOwnProperty("radice")) {
                    //  alert("ha radice");

                    //  console.log("analisi tempo");
                    //  console.log(tempo[pronome]);

                    // guarda se la radice ha un array che separa le persone
                      try {
                          tm=eval("r"+time);
                      } catch (e) {
                        tm=0;
                      }

                        //      console.log(">>>>>>>"+radice_reg);
                        if (tm) {
                            // se c'è la regola per il suo pronome prende la regola con la radice 1
                                num_radice = tm[pronome];
                            // remoto e cp
                            if (vb[time].radice[num_radice]) {
                                //  radice_reg=vb[tmp].radice[num_radice];
                                radice = vb[time].radice[num_radice];

                            }
                            //altri
                        } else {


                            // radice_reg=vb[tmp].radice;
                            radice = vb[time].radice;

                        }
                    }
                    /*** fine controllo radice **/
                    /*** 2. CONTROLLO TAGLI DI DESINENZA ***/
                    if (vb[time].hasOwnProperty("des")) {

                        tagliodes = vb[time].des;

                        //  console.log("tagliodes"+tagliodes);
                    }

                    /**** 3. CONTROLLO SINGOLA VOCE */ /////
                  //  console.log(time);


                    if (tmp == "part" || tmp =="gerundio") {
                        var fc = vb["part"];
                        var risposta = new Array("fc", fc);
                        return risposta;

                    } else if (time=="imperativo" && (riflessivo||diretto||indiretto) && pronome=="tu" && mylang=="it" && vb[time]["doppia"]) {

                        var fc=coniugatore.regImperativoDoppio(vb[time]["tu"]);
                    //    var fc = vb[time]["rif"];
                        var risposta = new Array("fc", fc);
                        return risposta;



                    } else {
                        // se è un passivo e il verbo non è essere (?)
                        if (passivo == "1" && vb.v != ausiliari[1]) {
                            var fc = vb["part"];
                        }
// 256 aggiunta per il condizionale che arriva qui anche se non dovrebbe
                        if(vb[tmp]) {
                        if (vb[tmp][pronome]) {
                          if(vb[tmp][pronome]=="-2") {
                            var risposta="-2";
                            return risposta;
                          } else {
                            var fc = vb[tmp][pronome];
                            var risposta = new Array("fc", fc);
                            return risposta;
                          }

                        }
                      }
                    }
                }
                // console.log("radice:"+radice_reg);

                /* regola specifica per tmp */


                if(vb[time]) {
                if(vb[time].regola) {

                  var r = regole.filter(
                      function(regole) {
                          return regole.regola == vb[time].regola;
                      });
                  //  console.log(r);

                  // una volta presa la regola qui cerca veramente il tempo giusto
                  if (r[0][tmp].hasOwnProperty(pronome)) {
                  //    console.log("la regola ha un pronome");
                      if (radice) {
                          fc = radice + r[0][tmp][pronome];
                      } else {
                          fc = radice_reg + r[0][tmp][pronome];
                      }
                      var risposta = new Array("fc", fc)
                      //          console.log(risposta);
                      return risposta;
                  }

                }
                }

                /**** 2. REGOLA *****/

                if (vb.regola) {
                  //  console.log("regola");
                    var r = regole.filter(
                        function(regole) {
                            return regole.regola == vb.regola;
                        });

                    //    alert(fnl);
                    // se la regola ha un tmp
                    if(r[0].hasOwnProperty("dec")) {
                        declinazione=r[0].dec;
                        console.log(declinazione);
                    }



                    if (r[0].hasOwnProperty(tmp)) {

                      if (r[0][tmp].hasOwnProperty("des")) {

                          tagliodes = r[0][tmp].des;

                          //  console.log("tagliodes"+tagliodes);
                      }





                      if(r[0][tmp]==-2) {

                        return -2;
                      }

                      var fnl='';
                      var n = r[0].regola.indexOf("_");

                      if(n>0) {
                        var termini =  r[0].regola.split("_");

                  //   alert(termini[0]);


                    //  alert(termini[1]);
                    var regterm = new RegExp(termini[0]+"([bcdfghlmnpqrstvz]{1,3})"+termini[1]);
                    var soluz = regterm.exec(v[0].v);
                          // at
                        //  alert(soluz[1]);
                      numcar=soluz[1].length+termini[0].length;
                      radice = radice_reg.substring(0, radice_reg.length - numcar);
                    //  alert(termini[0]);

                      fnl=termini[0]+soluz[1];
                  //   alert(fnl);
                //      alert(fnl);
                  //    v[0][tmp]["radice"][0]=radice_reg+fnl;
                      }
                      // prende le variazioni delle desinenze se ci sono
                      try {
                          tm=eval("r"+tmp);
                      } catch (e) {
                          tm=0;
                      }

                      // console.log("tmmmm");
                      // console.log(tm);
                        //   console.log("ha una regola "+r[0]);
                        // se il tmp ha una radice
                        if (r[0][tmp].hasOwnProperty("radice")) {
                            // se è un numero toglie quel numero dalla radice



                                if (tm) {
                              // se c'è la regola per il suo pronome prende la regola con la radice 1
                                    num_radice = tm[pronome];
                                  } else {
                                    num_radice=0;
                                  }

                                  radice = radice_reg.substring(0, radice_reg.length - r[0][tmp].radice[num_radice] );
                                // radice = radice_reg.slice(0, r[0][tmp].radice[num_radice]);

                            }
                    //        console.log(r[0][tmp]);

                    // se il tmp ha un pronome
                    if (r[0][tmp].hasOwnProperty(pronome)) {

                    if(r[0][tmp].hasOwnProperty(pronome)==-2) {
                        return -2;
                      }

                    //    console.log("la regola ha un pronome");
                        if (radice) {
                            fc = radice + r[0][tmp][pronome];
                        } else {
                            fc = radice_reg + r[0][tmp][pronome];
                        }
                        var risposta = new Array("fc", fc)
                        //          console.log(risposta);
                        return risposta;
                    }

                        if (r[0][tmp].hasOwnProperty("semiradice")) {


                            if(radice) {

                              radice = radice + r[0][tmp].semiradice;
                            } else {

                            radice = radice_reg + r[0][tmp].semiradice;
                            }


                          //  console.log("semiradice rule" + radice);
                            var risposta = new Array("ra", radice);
                            return risposta;
                            // la cerca nel verbo direttamente
                        }

                        if (r[0][tmp].hasOwnProperty("semiradice2")) {

                          if (tm) {
                        // se c'è la regola per il suo pronome prende la regola con la radice 1
                              num_radice = tm[pronome];
                            } else {
                              num_radice=0;
                            }


                            if(r[0][tmp].hasOwnProperty("remove")) {
                            //  console.log("remove");
                              var remove=r[0][tmp]["remove"][num_radice];

                            //  alert(fnl);

                                  fnl=fnl.substring(remove, fnl.length);



                            }


                            if(!radice) {
                                radice = radice_reg + r[0][tmp].semiradice2[num_radice]+fnl;
                            } else {
                              radice = radice + r[0][tmp].semiradice2[num_radice]+fnl;
                            }
                      //      alert(semiradice2[num_radice]);
                      //      alert(radice);

                        // con semiradice2 manda già al finale
                          //  console.log("semiradice rule" + radice);
                            var risposta = new Array("ra", radice);
                            return risposta;
                            // la cerca nel verbo direttamente
                        }




                        if (tmp == "part" || tmp=="gerundio") {
                            // console.log("passatoooo");
                            if (r[0][tmp]) {
                                fc = radice + r[0][tmp].txt;
                                var risposta = new Array("fc", fc);
                                return risposta;
                            }
                        }

                    }
                }




                //    console.log("radice_reg"+radice_reg);

                /*** 3. REGOLARE ********************************************************/
                //  è regolare

                if (typeof radice != "undefined") {
                //    console.log("radice finale" + radice)
                    var risposta = new Array("ra", radice);
                    return risposta;
                }
                var risposta = new Array("", "");
                // alert(risposta);
                return risposta;
            },

            // trova il verbo nel json
            cerca: function(criterio) {
                return verbi.filter(
                    function(verbi) {
                        return verbi.v == criterio
                    }
                );
                // console.log(found);
                // guarda se il tempo è irregolare
            },
            cercaID:function(criterio) {
              return verbi.filter(
                  function(verbi) {
                      return verbi.id == criterio
                  }
              );
            },
            desinenza: function(des, pronome) {
                //    console.log("pronome"+pronome);
                decl = eval(des);
                var oggetto = decl.filter(
                    function(decl) {
                        return decl.pro == pronome
                    }
                );
                //  console.log(oggetto);
                return oggetto;
            },

            inizia: function() {
              //  console.log(">>>>>>>>>>>>>>>>>>>>>>>>>inizia");
                tagliodes = 0;
              //  console.log(v);

                jQuery("#icon-more").css("display", "none");
                if (!v[0]) {
                    coniugatore.visualizza("Non trovato");
                }

                if (impersonale && jQuery("#" + pronome).hasClass("disabilitato")) {
                    // console.log("non va");
                    coniugatore.visualizza(noexist);
                    return;
                }


                jQuery("#filtro").empty();
                riflessivo = 0;

                // coniugatore.calcolaDeclinazione();
                // console.log(radice_reg);

                tempo = jQuery("a.tempo.ui-btn-active").attr("id");


                if (jQuery(".ui-checkbox:nth-child(2)").css("display") == "block") {
                    if (jQuery("#essere").is(":checked")) {
                        //  console.log("checked");
                        aus = ausiliari[1];
                    } else {
                        aus = ausiliari[0];
                    }
                }

                if (jQuery("#riflessivo").is(":checked")) {
                    riflessivo = 1;
                  //  console.log("is checked");
                }
                // console.log(riflessivo);
                if (jQuery("#passivo").is(":checked")) {
                    //    console.log("passivo è selezionato");
                    passivo = 1;
                    riflessivo = 0;
                } else {
                    passivo = 0;
                }

                tmp = eval(tempo);
                if (tempo == "passato") {
                    jQuery("#icon-more").css("display", "block");
                }
                var finale = [];
                var nome= [];
                if(tmp) {
                var tot = tmp[passivo].length;
                }
                for (x = 0; x < tot; x++) {
                    if (tmp[passivo][x] == -1) {
                        coniugatore.visualizza(noexist);
                        return false;
                    }
                    finale[x] = coniugatore.calcola(tmp[passivo][x]);
                    nome[x]=tmp[2][x];
                }
              //  console.log(finale);
                coniugatore.mostra(finale,nome);
            },
            calcolaNumero: function() {
                if (jQuery("#" + pronome).hasClass("singolare")) {
                    return ms + "/" + fs;
                } else {
                    return mp + "/" + fp;
                }

            },
            isVowel:function(carattere) {
              return ["a","e","i","o","u"].includes(carattere);
            },
            getVowels:function() {
              var m = v[0].v.match(/[aeiouy]/gi);
              return m === null ? 0 : m.length;
            },
            calcolaDeclinazione: function() {
        //      console.log("calcola alias");
              if (v[0].alias) {
                  nuovo = v[0].alias;
                  alias = 1;
                  diff = coniugatore.getDifference(nuovo, v[0].v);
                  // cerca l'altro verbo
                  v = coniugatore.cerca(nuovo, tempo);
              }

                verbo = v[0].v;
                // console.log("ricontrollo regola");
                // console.log(verbo);
                // guarda la declinazione del verbo (er, ir)

                len = verbo.length;

                  if(mylang!="en") {
                    declinazione = (verbo.substr(-numdecl));
                    radice_reg = verbo.substring(0, len - numdecl);
                  }
/********* inglese *************************************************************/
                      if(mylang=="en") {
                        declinazione = "are";
                        len = verbo.length;

                        var ultima=verbo.charAt(len-1);
                        var penultima=verbo.charAt(len-2);
                        var terzultima=verbo.charAt(len-3);
                      //  console.log(ultima);

                      if(ultima=="e") {
                        v[0].regola="gerundio";
                      }

                      if(!v[0].part) {
                        if(ultima=="e") {
                          v[0].regola="e";
                        }

                        if (!coniugatore.isVowel(ultima) && ultima!="x" && ultima!="w") {
                          var penultima=verbo.charAt(len-2);
                          if(coniugatore.isVowel(penultima)) {
                              var terzultima=verbo.charAt(len-3);
                            if(!coniugatore.isVowel(terzultima)) {

                            var voc=coniugatore.getVowels();
                              if(voc==1 || v[0].regola=="double") {
                              v[0].part=v[0].v+ultima+"ed";
                              v[0]["gerundio"]=v[0].v+ultima+"ing";
                              v[0]["perfect"]={"radice":v[0].v+ultima+"ed"};
                              }
                            }
                          }
                        }
                      }
                      radice_reg = v[0].v;
                      }

                      /**** FINE INGLESE ****/
                // alert(radice_reg);
                // aggiunge la regola nel caso
                for (x = 0; x < fini.length; x++) {
                    //  console.log(fini[x].f);
                    // se trova una fine con regola nel verbo
                    if (verbo.indexOf(fini[x].f) >= 0) {
                        //    console.log(">>>"+verbo.indexOf(fini[x].f));
                        if (verbo.length - verbo.indexOf(fini[x].f) == fini[x].f.length) {
                            // console.log("la regola è " + fini[x].r);
                            if(fini[x].r) {
                              // se non ha già una regola mette quella del finale
                              if(!v[0].regola) {
                                v[0].regola = fini[x].r;
                              }
                            }
                            if(fini[x].dec) {
                              declinazione=fini[x].dec;
                            }
                            if(fini[x].rad) {
                              radice_reg=verbo.substring(0, len - fini[x].rad);
                            }
                            if(fini[x].rif) {
                              riflessivo=1;
                              jQuery("#riflessivo").prop("checked", true);

                              if(!v[0].solorif) {
                              v[0].rif=1;
                              jQuery("#riflessivo").siblings("label").addClass("ui-btn-active");
                              }
                            }
                            if(fini[x].pro) {
                              pronominale=1;
                            }
                            break;
                        }
                    }
                }

                // console.log("dentro calcolaDecl" + radice_reg);
            },
            // è la prima operazione che compie
            calcola: function(tempo) {
              //  console.log(v);
            //    console.log("inizio calcola aus:" + radice);
                var radice = '';

                // rimette l'ausiliare avere dopo i verbi coi gerundi
                if(mylang=="en") {
                aus=ausiliari[0];
                }
              //  alert(aus);

                // aus=v[0].aus;
                var radice_irr = '';
                var forma_corretta = '';
                verbostringa = jQuery("#verbo").val();

                verbo = verbostringa.toLowerCase();
                verbo = v[0].v;
              //  console.log(v);
                //console.log(declinazione);
                //console.log("dentro calcola"+radice_reg);

                // restituisce un oggetto con tutte le desinenze specifiche del pronome in base alla declinazione
                var des = coniugatore.desinenza(declinazione, pronome);

                if(mylang=="en") {

                  ////* ENG solo per l'inglese */////
                  if(v[0][tempo]) {
                   des[0][tempo]="";
                  } else {
                  //  alert("non ha il tempo");

                  }
                //    console.log(des);

                }

                // restituisce l'oggetto verbo
                //    found=coniugatore.cerca(verbo, tempo);
                if (!v) {
                    if (tempo == "passato") {
                        finale = "Non trovato";
                        coniugatore.visualizza(finale);
                    } else {
                        return "Non trovato";
                    }
                }

                var res = tempo.split(" ");
          //      console.log(res);
              //  alert(tempo);
                if(res[0]=="imperativo") {
                  //  alert(res[1]);

                    tempo=coniugatore.calcolaImperativo(mylang, res[1]);
              //      console.log(tempo);
                  }
                  // l'italiano è l'unica lingua che usa l'infinito per l'imperativo
                  if(tempo=="infinito" && mylang=="it") {

                    if(v[0].v.slice(-2)=="si") {
                      var inf=verbostringa.substring(0,verbostringa.length-2);
                      finale=inf+"e";
                    } else if (pronominale=="1") {
                        var inf=verbostringa.substring(0,verbostringa.length-4)
                        finale=inf+"e";
                    } else {
                    //  alert(v[0].v);
                    //  alert(diff);
                        finale= v[0].v;
                    }


                  }






                // restituisce l'aus
                if (riflessivo == 1 || passivo == 1) {
                    //  console.log("pass e riss");
                    aus =ausiliari[1];
                }





              //  console.log(v[0]);
                // restituisce un array che segnala se è a radice o completo (e rispettivo valore);
                if (res[1]=="passato" || res[2]=="passivo") {
                    var risultato = coniugatore.guardaIrregolare(v[0], "part", pronome);
                  } else if (res[1]=="gerundio") {

                    var risultato = coniugatore.guardaIrregolare(v[0], "gerundio", pronome);
                  //  console.log(risultato);
                } else if (tempo=="infinito") {

                    risultato=["fc",finale];
                } else {
                    var risultato = coniugatore.guardaIrregolare(v[0], tempo, pronome);

              //    console.log(tempo);
                  //  console.log(risultato);

                    dsn = des[0][tempo];


                    if (tagliodes == "-1") {
                        // taglia la prima lettera della desinenza
                        dsn = dsn.slice(1);
                    }
                }
                // se non è stato già deciso sopra (vale per i presenti che hanno una forma irregolare non basata su un unica radice)
                if (risultato == "-2") {
                    finale = noexist;
                    return finale;
                }


///////////////////////////////// SE sono tempi composti
                if(res[1]=="passato" || res[1]=="gerundio") {

                  if((res[2]=="passivo") && (mylang=="fr" || mylang=="es" || mylang=="en")) {
                    aus=ausiliari[0];
                  }

                  /* PASSATO PROSSIMO */
                  /* se è completa  */
                  if (risultato[0] == "fc") {
                      /* il termine radice non è esatto */
                      radice = diff + risultato[1];
                  } else {

                      radice = radice_reg;
                  }

                  if(res[1]=="passato") {
                    var participio = coniugatore.creaParticipio(risultato[0], pronome, aus, radice, declinazione);
                  } else {
                    var participio=coniugatore.creaGerundio(risultato);
                    aus=ausiliari[1];
                  }
                  // alert(participio);

                  // in base all'aus lo coniuga e setta il participio singolare o plurale
                  if (aus == ausiliari[0]) {
                      ausiliare = verbi[0];
                  } else {
                      ausiliare = verbi[1];
                  }

                  nuovotempo = res[0];
                  // core della creazione
                  finale = ausiliare[nuovotempo][pronome];
                  // aggiunge stato se è passivo
                  if (res[2] == "passivo") {
                      if (jQuery("#" + pronome).hasClass("singolare")) {
                          finale = finale + " " + partpass[0];
                      } else {
                          finale = finale + " "+ partpass[1];
                      }
                  }

                  finale = finale + " " + participio;

                } else {
                ///////////////////// tempi SEMPLICI

                if(res[0]=="imperativo") {
                  if (rimperativo[pronome]==-1 ) {
                  finale = noexist;
                  return finale;
                }


              }
                  // se ha trovato direttamente una forma completa
                  if (risultato["0"] == "fc") {
                      // console.log("completa"+diff);
                      finale = diff + risultato[1];
                  } else {
                      // se ha trovato una radice ()
                      if (risultato[0] == "ra") {
                          radice = diff + risultato[1];

                      } else {
                          // se è regolare
                          radice = diff + radice_reg;
                        //  alert(radice);
                      }

                      //    console.log("dsn"+dsn);
                      // se la prima lettera di desinenza regolare o radice irregolare è uguale all'ultima della radice (ex: tu mangii) allora toglie la desinenza (verbi in iare)
                  //  if (dsn[0] == radice.slice(-1) && v[0].v != "creare") {

                          // toglie la prima della desinenza
                  //        dsn = dsn.slice(1);
                //      }
                      finale = radice + dsn;

                }
              }


              // se riflessivo aggiunge i pronomi
                if (riflessivo || diretto || indiretto) {
                    var scelto='';
                    // console.log("diretto"+diretto);
                    // console.log("indiretto"+indiretto);
                    // console.log("riflessivo"+riflessivo);
                    // tu noi voi - va dopo ex: alzati, alzateci, alzatevi


                    if(diretto) {
                      var aggiunta=diretti[pron_dir];
                      var aggiunta_imp=diretti[pron_dir];
                      var scelto=pron_dir;
                      }

                    if(indiretto) {
                      var aggiunta=indiretti[pron_indir];
                      var aggiunta_imp=indiretti[pron_indir];
                      var scelto=pron_indir;
                    }
                    if(riflessivo) {
                      var aggiunta=riflessivi[pronome];
                      var aggiunta_imp=riflessivi_imp[pronome];
                    }

                    if(diretto && indiretto) {
                      if(v[0][res[0]]) {
                        if(v[0][res[0]].doppio==-2) {
                          finale=noexist;
                          return finale;
                        }
                      }
                      var aggiunta=indiretti2[pron_indir];
                      var aggiunta_imp=indiretti2[pron_indir];
                      if (pron_indir!="lui" && pron_indir!="lei" && pron_indir!="loro") {
                        aggiunta=aggiunta+" ";
                      }
                      aggiunta=aggiunta+diretti[pron_dir];
                      aggiunta_imp=aggiunta_imp+diretti[pron_dir];
                      var scelto=pron_indir;
                    }
                    if(diretto && riflessivo) {
                      if(v[0][res[0]]) {
                      if(v[0][res[0]].doppio==-2) {
                        finale=noexist;
                        return finale;
                      }
                    }
                      var aggiunta=rif_comp[pronome];
                      var aggiunta_imp=rif_comp[pronome];
                      aggiunta=aggiunta+" ";
                      aggiunta=aggiunta+diretti[pron_dir];
                      aggiunta_imp=aggiunta_imp+diretti[pron_dir];
                    }



                    if((pronome=="io" && scelto=="noi") || (pronome=="noi" && scelto=="io") || (pronome=="tu" && scelto=="voi") || (pronome=="voi" && scelto=="tu")) {
                      finale=noexist;
                      return finale;
                    }



                  //  console.log(res[0]);
                  //  console.log(pronome);
                  //  console.log(pronomi[1][3]);
                  switch(mylang) {
                    case "fr":
                    // nel francese lo mette dopo
                    var tempoimp=res[0];
                    break;
                    case "it":
                    var tempoimp=tempo;
                    break;
                    case "es":
                    break;
                  }

                  // per l'italiano: se è noi tempo risulta cp e non imperativo, quindi lo calcolo su res[1] che è sempre imperativo (per metterlo in fondo)
                    if (tempoimp == "imperativo" && (pronome == pronomi[1][1] || pronome == pronomi[1][4]) || res[0]=="imperativo" && pronome == pronomi[1][3]) {
                //      console.log("qui lo mette dopo");
                        finale = finale + aggiunta_imp;

                    } else {
                  //     console.log("qui lo mette prima");
                        var rif=coniugatore.calcolaApostrofo(aggiunta,finale);
                      //  console.log(rif);
                        finale = rif + finale;

                    }

                }
                // fine diretto indiretto riflessivo doppio

                // se pronominale (ex andarsene)
                if (pronominale) {
                    if (tempo == "imperativo" && (pronome == "tu" || pronome == "voi" || pronome == "noi")) {
                        finale = finale + rif_comp[pronome] + "ne";
                    } else {
                        finale = rif_comp[pronome] + " ne " + finale;
                    }
                }

                if(res[1]=="negativo") {
                //  console.log("finaleeee2"+finale);
                  finale=coniugatore.calcolaNegazione(mylang, finale);
                }


                if(mylang=="en") {
                /* solo ENG inglese */
                var tempovero=res[0];
                if(are[0][tempovero]) {
                  if(are[0][tempovero].hasOwnProperty("before")) {
                        if(are[0][tempovero].before) {
                            finale=are[0][tempovero].before+" "+finale;
                        }
                  }
                }
              }




                if(showpronome==1 && res[0]!="imperativo") {

                          if(pronome=="je" && mylang=="fr") {

                              var pron=coniugatore.calcolaApostrofo(jQuery("#"+pronome).attr("name"),finale);
                              finale=pron+finale;

                          } else {
                            var pron=jQuery("#"+pronome).attr("name");
                            if(impersonale==2) {
                            //  alert("impersonale");
                              var pron=pronome;
                            }

                            finale=pron+" "+finale;
                          }


                }


                return finale;

            },

            mostra: function(finale, nome, aggiungi=0) {
              if(aggiungi!=1) {
                jQuery("#result").empty();
              }

                var tmp = eval(tempo);

                for (x = 0; x < finale.length; x++) {
                    jQuery("#result").append("<div name='"+nome[x]+"' class='verbo " + nome[x] + " "+pronome+"'>" + finale[x] + "</div>");
                    if(jQuery(".showtimes").hasClass("selected")) {
                     jQuery("#result").append("<div class='nometempo "+pronome+" "+nome[x]+"'>"+nome[x]+"<div>");
                    }
                }
                jQuery(".verbo").on("click",coniugatore.showTempi);
            },
            visualizza: function(finale) {

                jQuery("#result").empty();
                jQuery("#result").append("<div>" + finale + "</div>");

            },
            controllaOpzioni: function() {
                //  console.log("controllo passivo");
                //  console.log(v[0]);
                jQuery(".menu").css("display","none");
                if(v[0]) {
                  if(!v[0].aus) {
                    aus=ausiliari[0];
                  } else {
                    if (v[0].aus == "2") {
                    //    console.log("doppio aus");
                        aus = ausiliari[0];
                    //    console.log("ausiliare" + aus);
                        jQuery(".ui-checkbox:nth-child(3)").css("display", "block");
                    } else {
                        aus = v[0].aus;
                    }

                  }


                if (v[0].rif == 2) {

                  jQuery("#riflessivo").siblings("label").toggleClass("ui-btn-active");
                  jQuery("#riflessivo").prop("checked", true);
                 }
                 // se c'è il passivo c'è il PD full quindi anche il riflessivo / idem con PI
                if (v[0].rif >0 || v[0].passivo || v[0].term && v[0].impersonale!=1 ) {
                    jQuery(".box-rif").css("display", "block");
                }
                if(v[0].solorif) {
                  jQuery(".box-rif").css("display","none");
                // jQuery("#riflessivo").siblings("label").removeClass("ui-btn-active");
                }

                if (v[0].passivo == 1) {

                    jQuery(".box-pas").css("display", "block");
                    passivo = 1;
                } else {
                    jQuery(".box-pas").css("display", "none");
                    passivo = 0;
                }
                // show pd
                if (v[0].passivo == 1 || v[0].trans) {
                    jQuery(".box-pd").css("display", "block");
                  }
                // show pi
                if (v[0].term==1) {
                      jQuery(".box-pi").css("display", "block");
                }

                coniugatore.controllaImpersonale();
                coniugatore.calcolaDeclinazione();
                }
            },
            abilitaBottoni: function(valore) {
                jQuery(".pronome").removeClass("disabilitato");
                jQuery(".pronome").removeClass("sconsigliato");
                switch (valore) {
                    case 0.5:
                        // tutti abilitati, consigliati solo lui e loro
                        jQuery(".pers").addClass("sconsigliato");
                        break;
                    case 0.75:
                          // tutti abilitati, consigliato solo lui
                          jQuery(".pers").addClass("sconsigliato");
                          var loro=pronomi[1][5];
                          jQuery("#"+loro).addClass("sconsigliato");
                          break;
                    case 1:
                        // abilitati solo lui e loro, altri non esiste
                        jQuery(".pers").addClass("disabilitato");
                        break;
                    case 1.5:
                        //  abilitati lui e loro, loro sconsigliato
                        jQuery(".pers").addClass("disabilitato");

                        var loro=pronomi[1][5];
                        jQuery("#"+loro).addClass("sconsigliato");
                        break;
                    case 2:
                        // abilitato solo lui
                        // console.log("sono 2");
                        var loro=pronomi[1][5];

                        jQuery(".pers").addClass("disabilitato");
                        jQuery("#"+loro).addClass("disabilitato");
                        break;

                    default:
                        //    console.log("sono default"+valore);
                        break;
                }
            },
            calcolaApostrofo:function(pron,verbo) {
                switch(mylang) {
                    case "fr":
                      if((verbo.charAt(0)=="a" || verbo.charAt(0)=="e" || verbo.charAt(0)=="i" || verbo.charAt(0)=="o" || verbo.charAt(0)=="u"|| verbo.charAt(0)=="é" ) && (pron!="nous" && pron!="vous")) {

                            var rif=pron.charAt(0)+"'";
                            return rif;
                      }
                      break;
                      case "it":
                      var lastChar = pron[pron.length -1];
                      if(verbo.charAt(0)=="h" && (lastChar =="o" || lastChar =="a")) {
                        // alert(pron);
                        var tagliato = pron.slice(0, -1)+"'";
                        // var rif=pron.charAt(0)+"'";
                        return tagliato;
                      }
                }
                return pron+" ";
            },
            controllaImpersonale: function() {

                //    console.log("controllo impersonale");
                if (v[0].impersonale) {
                //   console.log("è impersonale");
                    impersonale=v[0].impersonale;
                    this.abilitaBottoni(v[0].impersonale);

                    // se è un impersonale e ha l'opzione essere/avere ed è avere allora deve avere solo la terza persona singolare
                    if (v[0].aus == "2" && jQuery("#essere").is(":checked") == false) {
                        //      console.log("e' avere");
                        this.abilitaBottoni(2);
                    }
                }
            },

            // cerca l'id // insert 2 è solo per i verbi che si ripetono
            insertVerbo2:function() {
              v = coniugatore.cercaID(this.id);
              // console.log(v);

              coniugatore.controllaOpzioni();
              // coniugatore.controllaImpersonale();

              if (jQuery("#" + this.id).hasClass("trad")) {
                  var trad = jQuery("#" + this.id).attr("trad");
                  jQuery("#lingua").val(trad);
              };

              jQuery("#filtro").empty();
              jQuery("#verbo").val(v[0].v);

              if (jQuery(".tempo").hasClass("ui-btn-active") && jQuery(".pronome").hasClass("ui-btn-active")) {
                  //    console.log("inizioooo");
                  coniugatore.inizia();
              }
            },
            // cerca il nome
            insertVerbo: function() {
              //  console.log(this.id);
                v = coniugatore.cerca(this.id);
                console.log(v);
                if(v[0]) {
                  console.log("controllo opzioni verbo");
                  coniugatore.controllaOpzioni();

                //  coniugatore.controllaImpersonale();
                }
                if (jQuery("#" + this.id).hasClass("trad")) {
                    var trad = this.getAttribute("trad");
                    jQuery("#lingua").val(trad);
                };
                var testo=this.innerHTML;



                var res = testo.split("/");

                jQuery("#filtro").empty();

                // alert(testo);
                jQuery("#verbo").val(res[0]);



                if(mylang=="fr") {
                //  console.log(testo);
                  var trovase= testo.indexOf("(se)");
                  // se il verbo trovato è un riflessivo
                    if(trovase>1) {

                      jQuery("#riflessivo").prop("checked", true);
                        // se non è selezionato come riflessivo di default lo setta
                      if(!jQuery("#lriflessivo").hasClass("ui-btn-active")) {
                        jQuery("#lriflessivo").addClass("ui-btn-active");
                      }
                    }
                }
              //  console.log(riflessivo);

                if (jQuery(".tempo").hasClass("ui-btn-active") && jQuery(".pronome").hasClass("ui-btn-active")) {
                    //    console.log("inizioooo");
                    coniugatore.inizia();
                }
            },
          
            selPronomeDiretto: function() {
                //  alert(this.id);
                // disabilita tutti

                jQuery(".pd").not(this).removeClass("ui-btn-active");
                // cambia se stesso
                jQuery(this).toggleClass("ui-btn-active");

                jQuery(".pronome").removeClass("disabilitato");


                // se viene attivato
                  if (jQuery(this).hasClass("ui-btn-active")) {

                    pron_dir = this.id;
                    pron_dir=pron_dir.split("_");
                    pron_dir=pron_dir[1];

                    jQuery("#"+illogic[pron_dir]).addClass("disabilitato");

                    diretto=1;

                    if(pronome==pron_dir && pronome!="lui" && pronome!="loro" ) {
                      diretto=0;
                      coniugatore.disProDir("all",true);
                      jQuery("#lriflessivo").click();
                      return;
                    }


                  } else {
                    diretto=0;
                  }

                if (jQuery(".tempo").hasClass("ui-btn-active") && jQuery("#verbo").val()) {

                      coniugatore.inizia();

                }

            },
            selPronomeIndiretto: function() {

                jQuery(".pronome").removeClass("disabilitato");

                //  alert(this.id);
                jQuery(".pi").not(this).removeClass("ui-btn-active");
                jQuery(this).toggleClass("ui-btn-active");

              // se è selezionato
                  if (jQuery(this).hasClass("ui-btn-active")) {

                    pron_indir = this.id;
                    pron_indir=pron_indir.split("_");
                    pron_indir=pron_indir[1];

                    jQuery("#"+illogic[pron_indir]).addClass("disabilitato");

                    if(pronome==pron_indir && pronome!="lui" && pronome!="loro" ) {

                      jQuery("#lriflessivo").click();
                      return;
                    }

                    indiretto=1;

                  } else {
                    // se è deselezionato


                    indiretto=0;


                  }



                if (jQuery(".tempo").hasClass("ui-btn-active") && jQuery("#verbo").val()) {
                    //  alert("inizio");
                    console.log("inizio");
                      coniugatore.inizia();

                    //  console.log("ok sostituisco check");
                }

            },
            selPronomeDoppio: function() {
              jQuery(".pc").not(this).removeClass("ui-btn-active");
              jQuery(this).toggleClass("ui-btn-active");
              // se è attivato
              if (jQuery(this).hasClass("ui-btn-active")) {
                    pron_dir = this.id;
                    pron_dir=pron_dir.split("_");
                    pron_dir=pron_dir[1];
                    diretto=1;

              } else {
              // se è deselezionato
                   diretto=0;

              }
              if (jQuery(".tempo").hasClass("ui-btn-active") && jQuery("#verbo").val()) {
                    coniugatore.inizia();
                  //  console.log("ok inizio doppio");
              }

            },
            selTempo: function() {

                jQuery(".tempo").removeClass("ui-btn-active");
                jQuery(this).addClass("ui-btn-active");

                tempo = this.id;
                if(v[0]) {
                  if (tempo == "imperativo") {
                    // jQuery("#io").addClass("disabilitato");
                  } else {
                    // alert(v[0].impersonale);
                    if (impersonale != 1 && impersonale != 1.5 && impersonale != 2) {

                        //  alert("posso ripristinare");
                    }
                    //  jQuery("#io").removeClass("disabilitato");
                }
              }
                if (jQuery(".pronome").hasClass("ui-btn-active") && jQuery("#verbo").val()) {
                    //  console.log("ok sostituisco check");
                    coniugatore.inizia();
                }
            },
            getDifference: function(a, b) {
                // ex porre proporre
                //    console.log(a+" "+b);
                var i = a.length;
                var j = b.length;
                var result = "";

                while (j > -1) {
                    if (a[i] != b[j]) {
                        result = b[j] + result;
                        //    console.log(j);
                        //      console.log(b[j]);
                    } else {
                        i--;
                    }
                    j--;
                }
                return result;
            },
            cancella: function() {
                jQuery(".pd").removeClass("disabilitato");
                jQuery(".pi").removeClass("disabilitato");
                jQuery(".menu").css("display","block");
                jQuery("#icon-more").css("display", "none");
                jQuery("#passivo").prop("checked", false);
                jQuery("#essere").prop("checked", false);
                jQuery("#riflessivo").prop("checked", false);
                jQuery("#essere").siblings("label").removeClass("ui-btn-active");
                jQuery("#passivo").siblings("label").removeClass("ui-btn-active");
                jQuery("#riflessivo").siblings("label").removeClass("ui-btn-active");
                jQuery("#imperativo").removeClass("disabilitato");
                jQuery(".lista_pd").removeClass("show");
                jQuery(".lista_pi").removeClass("show");
                jQuery(".lista_pc").removeClass("show");
                jQuery(".pd").removeClass("ui-btn-active");
                jQuery(".pc").removeClass("ui-btn-active");
                jQuery(".pi").removeClass("ui-btn-active");
                jQuery("#pd").siblings("label").removeClass("ui-btn-active");
                jQuery("#pi").siblings("label").removeClass("ui-btn-active");
                jQuery("#pd").prop("checked", false);
                jQuery("#pi").prop("checked", false);
                diretto=0;
                indiretto=0;

                jQuery("#filtro").empty();
                jQuery("#result").empty();
                tempo = '';
                pronome = '';
                pronominale = '';
                impersonale='';
                diff = '';
                v = '';
                irr = '';
                tagliodes = 0;
                radice_reg='';
                pron_dir='';
                pron_indir='';

                jQuery(".pronome").removeClass("sconsigliato");
                jQuery(".pronome").removeClass("disabilitato");
                jQuery(".tempo").removeClass("ui-btn-active");
                jQuery(".pronome").removeClass("ui-btn-active");
                jQuery(".ui-checkbox").css("display", "none");
            },

            svuota: function(e) {

                if (e.keyCode == "8") {
                    coniugatore.cancella();
                }

            },
            delete: function() {
                jQuery("#verbo").val("");
                coniugatore.cancella();
            },
            deleteLang: function() {
                jQuery("#lingua").val("");

            },
            showLingueMenu: function() {

              if (jQuery(this).hasClass("selected")) {
                ling=jQuery(this).attr("lang");
              } else {
                ling=mylang;
              }
              window.localStorage.setItem("lang", ling);

              coniugatore.showSecondInput();
            },
            showLingue: function() {
                num_lang++;
                if (num_lang == 4) {
                    num_lang = 0;
                }
                ling = langs[num_lang];
                //  jQuery(".lang").toggleClass("show-inline");
                jQuery("#lingua").val("");
                jQuery("#filtro").empty();
                coniugatore.showSecondInput();
            },
            showSecondInput: function() {
                //   console.log("second input");
                // console.log(this.id)
                jQuery("#lingua").removeClass("en");
                jQuery("#lingua").removeClass("fr");
                jQuery("#lingua").removeClass("es");
                if (ling != langs[0]) {
                    jQuery(".langsearch").addClass("show-block");
                } else {
                    jQuery(".langsearch").removeClass("show-block");
                }
                jQuery("#lingua").addClass(ling);
                jQuery("#lingua").attr("name", ling);

            },
            filtraLinguaNew: function() {
              // ling è la lingua in cui sto cercando
              var ling = jQuery("#lingua").attr("name");
            //   console.log("sto cercando qui"+ling);
              coniugatore.cancella();
              vvf = jQuery("#lingua").val();
              vv = vvf.toLowerCase();
              var numcar = vv.length;
              if (numcar < 2) {
                  return;
              }
              // cerca tutti i verbi tra

              // console.log(verbitra);

              trovato = trad.filter(
                function(trad) {
                //    console.log(trad);
                /// se il verbo nella lingua in cui cerco è unico (non è una lista)
                  //  console.log(typeof trad[ling]);
                      if (typeof trad[ling] === 'string') {
                          var n = trad[ling].startsWith(vv);
                          if (n == true) {
                            //  alert(mylang);

                              // per il verbo doppio (riflettere)
                                      if(trad[ling].vis) {
                                        name=verbitra.v;
                                        classe='verbofiltro2';
                                        idd=verbitra.id;
                                      } else {
                                        name=trad[mylang];
                                        classe='verbofiltro';
                                        idd=trad[mylang];
                                      }

                            // se nella lingua dell'app ci sono più parole

                            if(typeof trad[mylang]=="object") {

                                tot=trad[mylang].length;

                                for(m=0;m<tot;m++) {

                                  name=trad[mylang][m];
                                  classe='verbofiltro';
                                  idd=trad[mylang][m];

                                  jQuery("#filtro").append("<div trad='" + trad[ling] + "' id=" + idd + " class='"+classe+" trad " + ling + " ui-btn ui-corner-all ui-btn-a'>" + name + " / " + trad[ling] + "</div>");

                                }

                            } else {
                              /* se nella lingua app non ci sono array (italiano sempre) */
                              /* esclude i verbi della lingua app che non ci sono */
                          //    console.log(trad);
                              if(trad.hasOwnProperty("ex")) {
                                if(trad.ex[0]==mylang && trad.ex[1]==ling) {
                                  name="undefined";
                                }
                              }
                              if(name!="undefined") {
                                jQuery("#filtro").append("<div trad='" + trad[ling] + "' id=" + idd + " class='"+classe+" trad " + ling + " ui-btn ui-corner-all ui-btn-a'>" + name + " / " + trad[ling] + "</div>");
                              }


                            }


                              return trad[mylang];
                          }

                    /****  se il verbo della lingua in cui cerco è una lista  *******/
                      } else  if (typeof trad[ling] === 'object'){
                    // se ne trova tanti



                  //  console.log("ne trovo tanti");
                    var tipo=typeof trad[ling];

                         for (x = 0; x < trad[ling].length; x++) {
                              var n = trad[ling][x].startsWith(vv);
                              if (n == true) {

                                if(typeof trad[mylang]=="object") {
                                     for (k = 0; k < trad[mylang].length; k++) {
                                          jQuery("#filtro").append("<div trad='" + trad[ling][x] + "' id=" + trad[mylang][k] + " class='verbofiltro trad " + ling + " ui-btn ui-corner-all ui-btn-a'>" + trad[mylang][k] + " / " + trad[ling][x] + "</div>");
                                     }
                                } else {
                                  jQuery("#filtro").append("<div trad='" + trad[ling][x] + "' id=" + trad[mylang] + " class='verbofiltro trad " + ling + " ui-btn ui-corner-all ui-btn-a'>" + trad[mylang] + " / " + trad[ling][x] + "</div>");
                                }
                                  return trad[mylang];
                              }
                          }

                      }
                  }
              );
              jQuery(".verbofiltro").on("click", coniugatore.insertVerbo);
              jQuery(".verbofiltro2").on("click", coniugatore.insertVerbo2);

            },

            

            showTempi:function() {

              var nome=jQuery(this).attr("name");

              if(jQuery(this).hasClass("nome")) {
                //  jQuery(this).children.css();
              } else if (!jQuery(".showtimes").hasClass("selected")) {
                  jQuery(this).append("<div class='nometempo'>"+nome+"<div>");
              }
              jQuery(this).addClass("nome");

            },

            showMenu:function() {
              $( "#slide" ).animate({
  right: "0px"
}, 200, function() {
  // Animation complete.
});

            },
            closeMenu:function() {

              $( "#slide" ).animate({
  right: "-200px"
}, 200, function() {
  // Animation complete.
});

            },
            filtra: function(e) {
                coniugatore.cancella();
                // console.log(e.keyCode);
                if (e.keyCode == 8) {
                    return;
                }
                // if it's not a letter
                if (e.keyCode < 65 && e.keyCode > 90) {
                    return;
                }
                // spazio

                vvf = jQuery("#verbo").val();
                vv = vvf.toLowerCase();


                var numcar = vv.length;
                if (numcar < 2) {
                    return;
                }
                trovato = verbi.filter(
                    function(verbi) {
                        /*  var tr=verbi.v.indexOf(vv);
                      if(tr>0) {
                            console.log(verbi.v);
                        } */
                        var n = verbi.v.startsWith(vv);
                        //    console.log("tot"+n);
                        if (n == true) {
                          if(verbi.vis) {
                            name=verbi.vis;
                            classe='verbofiltro2';
                            idd=verbi.id;
                          } else {
                            name=verbi.v;
                            classe='verbofiltro';
                            idd=verbi.v;
                          }

                          if ((verbi.rif=="2") && (mylang=="fr")) {

                            name=name+" (se)";
                          }

                            jQuery("#filtro").append("<div id=" + idd + " class='"+classe+" ui-btn ui-corner-all ui-btn-a'>" + name + "</div>");
                            return verbi.v;
                        }

                    }

                );
                // se ne è rimasto solo uno
                if (trovato.length == 1) {

                    v = trovato;
                    coniugatore.controllaOpzioni();

                    // se scrivendo si arriva al verbo esistente attiva
                    // i controlli
                    if (v[0].v == vv) {

                      //  console.log("trovato");
                      //  console.log(v);

                        jQuery("#filtro").empty();

                    }
                    //    console.log(v);
                }
                jQuery(".verbofiltro2").on("click", coniugatore.insertVerbo2);
                jQuery(".verbofiltro").on("click", coniugatore.insertVerbo);
            }

        }
        document.addEventListener('deviceready', this.onDeviceReady, false);
        jQuery("#verbo").on("keyup", coniugatore.filtra);
        jQuery("#riflessivo").on("change", coniugatore.cambiaRif);
        jQuery("#verbo").on("keydown", coniugatore.svuota);
        jQuery(".pronome").on("click", coniugatore.selPronome);
        jQuery(".pd").on("click", coniugatore.selPronomeDiretto);
        jQuery(".pi").on("click", coniugatore.selPronomeIndiretto);
        jQuery(".pc").on("click", coniugatore.selPronomeDoppio);
        jQuery(".tempo").on("click", coniugatore.selTempo);
        jQuery("#passivo").on("change", coniugatore.formaPassiva);
        jQuery("#essere").on("change", coniugatore.cambiaAus);
        jQuery("#pd").on("change", coniugatore.clickProDir);
        jQuery("#pi").on("change", coniugatore.clickProIndir);
        jQuery("#delete").on("click", coniugatore.delete);
        jQuery("#deletelang").on("click", coniugatore.deleteLang);
        jQuery(".firstlogo").on("click", coniugatore.showLingue);
        jQuery("#lingua").on("keyup", coniugatore.filtraLinguaNew);
        jQuery("#more").on("click", coniugatore.passatoMore);
        jQuery(".menu").on("click", coniugatore.showMenu);
        jQuery(".close").on("click", coniugatore.closeMenu);
        jQuery(".menu-item").on("click", coniugatore.changeSettings);
        jQuery(".menu-lang").on("click", coniugatore.showLingueMenu);
        var value = window.localStorage.getItem("showtimes");
        if(value==1) {
          jQuery("#showtimes").addClass("selected");
        }
        var lingua = window.localStorage.getItem("lang");
        if(lingua) {
          if(lingua!=mylang) {
              jQuery(".b_"+lingua).addClass("selected");
              ling=lingua;
              coniugatore.showSecondInput();
          }
      }
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {

      cordova.getAppVersion.getVersionNumber().then(function (version) {
        //  jQuery('.info-alert').text(version);
        versione=version;
      });
      var networkState = navigator.connection.type;
      if (networkState !== Connection.NONE) {
        jQuery.ajax({
        url: "http://verbolarium.com/version"+mylang+".json",
        headers : { "cache-control": "no-cache" },
        dataType: "json",
        success: function(data){

          var i, difv;
          var regExStrip0 = /(\.0+)+$/;
          var string1=data.version;
          var string2=versione;
          var nuovaver=0;

          var segmentsA = string1.replace(regExStrip0, '').split('.');
          var segmentsB = string2.replace(regExStrip0, '').split('.');

          var l = Math.min(segmentsA.length, segmentsB.length);

          for (i = 0; i < l; i++) {
             difv = parseInt(segmentsA[i], 10) - parseInt(segmentsB[i], 10);
            // console.log(difv);
             if (difv>0) {
              //   return difv;
                var nuovaver=1;
             }
          }
          if(nuovaver) {
             if(data.force==true) {
               var ref = cordova.InAppBrowser.open(data.url, '_blank', 'hidden=yes,location=no,toolbar=no');
               // some time later...
               ref.show();
             } else {
               jQuery('.info-alert').append("New version "+data.version+" available");
             }

           }
          },
        error: function(jqXHR,textStatus,errorThrow){
          // jQuery('.info-alert').append(jqXHR);
          // jQuery('.info-alert').append(textStatus);
          // jQuery('.info-alert').append(errorThrow);
        }
      });

      }
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

      //     console.log('Received Event: ' + id);
    }
};

jQuery(document).ready(function() {


    app.initialize();
  //  for(x=0;x<verbi.length;x++) {
    //  if(verbi[x].traduzione) {
    //    if(!verbi[x].traduzione["es"]) {
    //  console.log(verbi[x].v);
  //  }
  //    }
  //  }
});
