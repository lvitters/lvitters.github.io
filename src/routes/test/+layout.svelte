<script>
	let { children } = $props();
</script>

<html>
	<head>
		<title>Component Test</title>
		<style>
			/* Hide any nav elements that might flash */
			nav {
				display: none !important;
			}
		</style>
	</head>
	<body>
		{@render children()}
	</body>
</html>
