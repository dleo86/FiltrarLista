function filtrarLista(selectobj) {
  // HTML SELECT object
  this.selectobj = selectobj;

  // Flags para combinar regexp.
  // "si" = ignorar caso; "" = no ignorar caso
  this.flags = "i";

  //Hacer una copia del arreglo de opciones
  this.optionscopy = new Array();
  for (var i=0; i < selectobj.options.length; i++) {
    this.optionscopy[i] = new Option();
    this.optionscopy[i].text = selectobj.options[i].text;
    this.optionscopy[i].value = selectobj.options[i].value;
  }

  //==================================================
  // METODOS
  //==================================================

  //--------------------------------------------------
  this.reset = function() {
  //Este metodo resetea la lista a su estado original.
  //Además deja de seleccionar cualquier opción 
    this.set("");
  }

  //--------------------------------------------------
  this.set = function(pattern) {
  //Este metodo eliminar todas las opciones de la lista,
  //luego agrega solo las opciones que combinan con el patrón regexp
  //También deja de seleccionar el resto de las opciones
  //En caso de error en regexp, devuelve falso
    var loop=0, index=0, regexp, e;

    // Limpiar la lista así nada es mostrado
    this.selectobj.options.length = 0;

    //Actualizar la expresión regular
    try {
      regexp = new RegExp(pattern, this.flags);
    } catch(e) {
      return;
    }

    //Repetir la lista entera
    for (loop=0; loop < this.optionscopy.length; loop++) {

      // Chequear si tenemos una combinación
      if (regexp.test(this.optionscopy[loop].text)) {

        //Tenemos una combinación, así agregamos esta opción a la lista
        this.selectobj.options.length = index + 1;
        this.selectobj.options[index].text = this.optionscopy[loop].text;
        this.selectobj.options[index].value = this.optionscopy[loop].value;
        this.selectobj.options[index].selected = false;

        // Incrementar el indice
        index++;
      }
    }
  }

  //--------------------------------------------------
  this.set_ignore_case = function(value) {
  //Este metodo coloca el regexp flags.
  //Si el valor es verdadero, coloca el flag en "i".
  //Si el valor es falso, coloca el flag en "". 
    if (value) {
      this.flags = "i";
    } else {
      this.flags = "";
    }
  }

}