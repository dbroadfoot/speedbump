Requires jquery

recommended css via bulma

options: 

speedbump_message (html)
speedbump_exclusions: csv, can end in * for wildcard

```

<html>
<head>
	
	<link rel="stylesheet" href="https://bulma.io/css/bulma-docs.min.css?v=202008010815">	
	
	<script src="https://code.jquery.com/jquery-3.5.1.min.js" integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0=" crossorigin="anonymous"></script>
	  
	<script type="text/javascript" src='https://cdn.jsdelivr.net/gh/dbroadfoot/speedbump@master/speedbump.js'></script>

	<script>
		
		$( document ).ready(function() {
		    $( 'body' ).speedbunp(
		    	{speedbump_message: '<p>This is a test!</p>', speedbump_exclusions: 'http://www.google*,/test'}
		    );
		});
		
	</script>
	
</head>
<body>

<p><a href='http://www.google.com'>Test</a></p>
<p><a href='/test'>Test 2</a></p>
	
</body>
</html>

```
