# validador.js

Librería de validación de datos en frontend.

>__IMPORTANTE:__ No todas las validaciones aseguran un 100% de integridad. Esta es una VALIDACIÓN EN CLIENTE para facilitar a los usuarios en el frontend, completar los datos de los formularios y/o hacer un primer filtro de calidad de la información.
>Una validación en cliente no aporta seguridad a una aplicación. De eso se encarga tu backend.
>¡Suerte!

# Documentación

### Métodos y propiedades

-   [diasMes](#diasmes)
-   [isNumber](#isnumber)
-   [isDate](#isdate)
-   [stringHasOnlyNumbers](#stringhasonlynumbers)
-   [stringIsANumber](#stringisanumber)
-   [isChar](#ischar)
-   [isString](#isstring)
-   [isValidString](#isvalidstring)
-   [isMail](#ismail)
-   [isTelephone](#istelephone)
-   [isNIF](#isnif)
-   [getNIFChar](#getnifchar)
-   [isNick](#isnick)
-   [compareDates](#comparedates)
-   [isColor](#iscolor)
-   [isLink](#islink)

## diasMes

Array con el número de días por cada mes. Febrero figura como un mes de 28 días.

> `Validador.diasMes`

## isNumber

Indica si el valor es un número y de tipo número (no acepta cadenas o booleans)

> Ejemplo válido: `Validador.isNumber(5);`

### Params

- **Number** `n`: El número a comprobar

### Return

- **Boolean**: True si es un número válido. False si no.

## isDate

Valida fechas.

- Formato **dd/mm/aaaa**.  
- El separador se puede pasar por parámetro.  
- Acepta fechas con días y/o meses con un sólo número. Por ejemplo, 05/09/2018 o 5/9/2018.  
- No acepta fechas anteriores a 1900.  

> Ejemplos válidos:
>  
> - `Validador.isDate('05/09/2018');`  
> - `Validador.isDate('10-9-1975', '-');`  

### Params

- **String** `fecha`: Fecha en formato d[d]/m[m]/aaaa.
- **String** `separador`: Separador de fechas opcional. "/" por defecto.

### Salida

- **Boolean**: True si es fecha válida. False si no.

## stringHasOnlyNumbers

Valida una cadena con contenido estríctamente numérico. No son válidos ni signos ni puntos, **sólo números**.

> Ejemplo válido: `Validador.stringHasOnlyNumbers("545890");`

### Params

- **String** `s`: La cadena a evaluar.  

### Salida

- **Boolean**: True si es una cadena con contenido estricamente numérico. False si no.

## stringIsANumber

Valida si una cadena contiene un valor numérico válido. Sólo acepta cadenas: no valen números ni booleanos.

> Ejemplo válido: `Validador.stringIsANumber("-10.88");`

### Params

- **String** `s`: La cadena a evaluar.  

### Salida

- **Boolean**: 

## isChar

Valida si una cadena contiene un único caracter y este es una letra internacional (de la 'a' a la 'z', sin tildes, eñes, cedillas o similares).

> Ejemplo válido: `Validador.isChar("a");`

### Params

- **String** `s`: La cadena a evaluar.  

### Salida

- **Boolean**: True si la cadena cumple las condiciones. False si no.

## isString

Valida si un string lo es de manera estricta.

> Ejemplo válido: `Validador.isString("Hace sol");`

### Params

- **String** `s`: La cadena a evaluar.  

### Salida

- **Boolean**: True si la cadena cumple las condiciones. False si no.

## isValidString

Valida si un string lo es, tiene una longitud mínima 
y si es es mas larga que el parámetro minLength

> Ejemplo válido: `Validador.isValidString("Hace sol", 4);`

### Params

- **String** `s`: La cadena a evaluar.  
- **Number** `minLength`: Longitud opcional a cumplir. Por defecto, 0.  

### Salida

- **Boolean**: True si la cadena cumple las condiciones. False si no.

## isMail

Valida si un email es válido.

> Ejemplos válidos: 
> 
> `Validador.isMail("usuario@dominio.com");`  
> `Validador.isMail("parte1.parte2@dominio.com");`  
> `Validador.isMail("usuario@dominio.co.uk");`  
> `Validador.isMail("usuario@subdominio.dominio.com");`  

### Params

- **String** `s`: La cadena a evaluar.  

### Salida

- **Boolean**: True si es un email válido. False si no.

## isTelephone

Valida si un teléfono es válido. **No es 100% fiable.** Teléfonos de centralitas podrían fallar, por ejemplo.

> Ejemplos válidos: 
> 
> `Validador.isTelephone("666223344");`  
> `Validador.isTelephone("666 22 33 44");`  
> `Validador.isTelephone("(+34) 555333111");`  
> `Validador.isTelephone("0034 555 333 111");`  

### Params

- **String** `s`: La cadena a evaluar. 

### Salida

- **Boolean**: True si es un teléfono válido. False si no.

## isNIF

Valida si una cadena es un NIF o un NIE. **No es válido para CIF de empresa**.

> Ejemplos válidos: 
> 
> `Validador.isNIF("22392856X");`  
> `Validador.isNIF("Z6419182W");`  

### Params

- **String** `s`: La cadena a evaluar.  

### Salida

- **Boolean**: True si es un NIF o NIE válido. False si no.

## getNIFChar

Calcula la letra del NIF. Para calcular la del NIE, primero hay que procesar la sustitución del primer caracter. **Esta función no calcula la letra del NIE**.

> Ejemplo: `var letra = Validador.getNIFChar("22392856");`

### Params

- **String** `s`: La cadena con el número de NIF (sin letra).  

### Salida

- **Char**: La letra del NIF.

## isNick

Valida si una cadena vale como nick de usuario, con estas reglas:  

- Longitud mínima de 6 caracteres.  
- Que sólo contenga letras ASCII, números y guiones bajos.  

> Ejemplo: `Validador.isNick("Manolo_100");`

### Params

- **String** `s`: La cadena a evaluar.  

### Salida

- **Boolean**: True si la cadena cumple las condiciones. False si no.

## compareDates

Compara fechas **válidas**. Las fechas han de validarse previamente.  
  

> Ejemplos:  
> 
> `var resultado = Validador.compareDates('10/01/2018', '10/01/2018');`  
> `var resultado = Validador.compareDates('5/7/1980', '11/12/1965');`  
> `var resultado = Validador.compareDates('23-05-2018', '30-04-2017', '-');`  

### Params

- **String** `f1`: Primera fecha.  
- **String** `f2`: Segunda fecha.  
- **String** `separador`: Caracter de separación opcional. Por defecto "/".  

### Salida

- **Number**: True si la cadena cumple las condiciones. False si no.  
	- `0`: Las fechas son iguales.  
	- `-1`: La primera es mayor.  
	- `1`: La segunda es mayor.

## isColor

Valida si una cadena es un color hexadecimal en formatos: #FFF y #FFFFFF.

> Ejemplo válido: `Validador.isColor("#FF00CC");`

### Params

- **String** `s`: La cadena a evaluar.  

### Salida

- **Boolean**: True si la cadena cumple las condiciones. False si no.

## isLink

Comprueba que un string comienza por http&#x3A;// o https&#x3A;//  

**Importante**: No hace más validaciones. No verifica la longitud de dominio, subdominio, extensión, ruta, parámetros ni ningún otro elemento de una URL. Sólo es un asistente para recordar al usuario si ha olvidado de poner el protocolo.

> Ejemplo válido: `Validador.isLink("https://www.google.com");`

### Params

- **String** `s`: La cadena a evaluar.  

### Salida

- **Boolean**: True si la cadena cumple las condiciones. False si no.

