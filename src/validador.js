'use strict'

/**
 * Librería de validación de datos en frontend.
 * IMPORTANTE: No todas las validaciones aseguran un 100% de integridad.
 *             Esta es una VALIDACIÓN EN CLIENTE para facilitar la 
 *             completación de formularios.
 *             
 * @author  Víctor Velasco <v.velasco@interactivaclic.com>
 * @version 1.0,      2018-11-21
 * 
 */

const Validador = {
    //Número de días por cada mes
    diasMes: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],

    /**
     * Indica si el valor es un número y de tipo número (no valen cadenas o booleans)
     * @param   Number  n          El número a comprobar
     * @return  Boolean
     */
    isNumber: function(n) {
        return typeof n === 'number' && isFinite(n);
    },

    /**
     * Valida fechas en formato dd/mm/aaaa
     * El separador de fechas puede ser otro pasado por parámetro
     * Acepta fechas con días y/o meses con un sólo número
     * No acepta fechas anteriores a 1900
     * 
     * @param   String  fecha        Fecha en formato d[d]/m[m]/aaaa
     * @param   String  separador    Separador "/" por defecto
     * @return  Boolean              True si es fecha válida
     */
    isDate: function(fecha, separador = "/") {
        let n = new String(fecha);
        let r = n.split(separador);
        if (r.length != 3) return false;
        let i = r[0],
            s = r[1],
            o = r[2];
        if (!this.stringIsANumber(i) || !this.stringIsANumber(s) || !this.stringIsANumber(o)) return false;
        i = parseInt(i, 10);
        s = parseInt(s, 10);
        o = parseInt(o, 10);
        if (o < 1900) return false;
        if (s < 1 || s > 12) return false;
        if (o < 0) return false;
        if (s == 2 && i == 29 && o % 4 == 0)
            if (o % 100 != 0 || o % 100 == 0 && o % 400 == 0) return true;
        return i > 0 && i <= this.diasMes[s - 1];
    },

    /**
     * Valida una cadena con contenido estríctamente numérico
     * sin signos ni puntos, sólo números
     * @param   Strign  s   La cadena a evaluar
     * @return  Boolean     True si es una cadena con contenido estricamente numérico
     */
    stringHasOnlyNumbers: function(s) {
        return s.length > 0 && !/\D/.test(s);
    },

    /**
     * Valida si una cadena contiene un valor numérico válido
     * Sólo acepta cadenas: no valen números ni booleanos
     * 
     * @param   String s
     * @return  Boolean
     */
    stringIsANumber: function(s) {
        return s.length > 0 && this.isNumber(+s);
    },

    /**
     * Valida si una cadena contiene un único caracter 
     * y este es una letra internacional (de la 'a' a la 'z')
     * 
     * @param   String s
     * @return  Boolean
     */
    isChar: function(s) {
        return this.isString(s) && s.length > 0 && s.search(/[^AZaz]/) == -1 ? true : false;
    },


    /**
     * Valida si un string lo es
     * 
     * @param   String s
     * @return  Boolean
     */
    isString: function(s) {
        return typeof s === 'string';
    },

    /**
     * Valida si un string lo es, tiene una longitud mínima 
     * y si es es mas larga que el parámetro minLength
     * 
     * @param   String s
     * @param   Number minLength
     * @return  Boolean
     */
    isValidString: function(s, minLength = 0) {
        return this.isString(s) && s.length > minLength;
    },

    /**
     * Valida si un email es válido
     * 
     * @param   String s
     * @return  Boolean
     */
    isMail: function(s) {
        return s.search(/[^A-Za-z0-9_.@-]/) == -1 && s.search(/[A-Za-z0-9_.-]+@{1}[A-Za-z0-9_.-]+\.{1}[A-Za-z0-9_.]/) != -1 ? true : false;
    },


    /**
     * Valida si un teléfono es válido
     * No es 100% fiable.
     * 
     * @param   String s
     * @return  Boolean
     */
    isTelephone: function(s) {
        let n = s.replace(/[^\d]/g, "");
        return n.length >= 9 && s.search(/[^+\() 0-9]/) == -1 ? true : false;
    },

    /**
     * Valida si una cadena es un NIF o un NIE
     * 
     * @param   String s
     * @return  Boolean
     */
    isNIF: function(s) {
        if (s.length != 9) return false;
        else {
            let char = s.substr(8,1), num = s.substr(0,8);

            switch (num.charAt(0).toUpperCase()) {
                case "X": num = "0" + num.substring(1); break;
                case "Y": num = "1" + num.substring(1); break;
                case "Z": num = "2" + num.substring(1); break;
            } 
            return this.stringIsANumber(num) && char.toUpperCase() == this.getNIFChar(num) ? true : false;
        }
    },

    /**
     * Calcula la letra del NIF
     * 
     * @param   String s          Cadena con el número de DNI
     * @return  String            Letra del DNI
     */
    getNIFChar: function(s) {
        let t = ["T", "R", "W", "A", "G", "M", "Y", "F", "P", "D", "X", "B", "N", "J", "Z", "S", "Q", "V", "H", "L", "C", "K", "E"],
            n = s + "";
        while (n.substring(0, 1) == "0" && n.length > 1) n = n.substring(1, n.length);
        return t[s - parseInt(n / 23) * 23]
    },

    /**
     * Valida si una cadena vale como nick de usuario, con estas reglas:
     *     - Longitud mínima de 6 caracteres
     *     - Que sólo contenga letras (EN), números y guiones bajos
     * 
     * @param   String s          El nick
     * @return  Boolean           Si cumple las reglas
     */
    isNick: function(s) {
        return s.search(/[^A-Za-z0-9\_]/) == -1 && this.isValidString(s, 6) ? true : false;
    },


    /**
     * Compara fechas (han de validarse previamente)
     * Devuelve
     *      0: Las fechas son iguales
     *     -1: La primera es mayor
     *      1: La segunda es mayor
     * 
     * @param   String f1         Primera fecha
     * @param   String f2         Segunda fecha
     * @param   String separador  Caracter de separación opcional
     * @return  Number 
     */
    compareDates: function(f1, f2, separador = "/") {
        if (f1 == f2) return 0;
        f1 = new String(f1), f2 = new String(f2);
        let _f1 = f1.split(separador), 
            _f2 = f2.split(separador);
        if (_f1[2] < _f2[2] || _f1[2] == _f2[2] && _f1[1] < _f2[1] || _f1[2] == _f2[2] && _f1[1] == _f2[1] && _f1[0] < _f2[0]) return 1;
        else return -1;
    },

    /**
     * Valida si una cadena es un color hexadecimal en 
     * formatos: #FFF y #FFFFFF

     * @param   String  s      El color
     * @return  Boolean
     */
    isColor: function(s) {
        return /^#[0-9a-f]{3,6}$/i.test(s);
    },

    getFriendlyURL: function(s) {
        return s.toLowerCase()
            .replace(/(á|ä|à|ã|â)/gi, "a")
            .replace(/(é|ë|è|ê)/gi, "e")
            .replace(/(í|ï|ì|î)/gi, "i")
            .replace(/(ó|ö|ò|ô)/gi, "o")
            .replace(/(ú|ü|ù|û)/gi, "u")
            .replace(/(ñ)/gi, "n")
            .replace(/(ç)/gi, "c")
            .replace(/^\s+|\s+$/g, "")
            .replace(/[_|\s]+/g, "-")
            .replace(/[^a-z0-9-]+/g, "")
            .replace(/[-]+/g, "-")
            .replace(/^-+|-+$/g, "");
    },

    /**
     * Comprueba que un string comienza por http:// o https://
     * No hace más validaciones
     * 
     * @param   String  e          La supuesta URL
     * @return  Boolean
     */
    isLink: function(e) {
        e = e.toLowerCase();
        return e.indexOf("http://") == 0 || e.indexOf("https://") == 0;
    },
};
/**
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = Validador;
} else {
    window.Validador = Validador;
}*/
window.Validador = Validador;
module.exports = Validador;