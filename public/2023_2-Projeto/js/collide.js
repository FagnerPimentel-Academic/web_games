function blockRect(r1,r2)
{
    //r1 - bloqueado
    //r2 - parede
    //catetos

    var catX = r1.centerX() - r2.centerX();
    var catY = r1.centerY() - r2.centerY();

    //Soma das metades
    var somaHalfWidth = r1.halfWidth() + r2.halfWidth();
    var somaHalfHeight = r1.halfHeight() + r2.halfHeight();

    if (r1.vida > 0)
	{
        //Diminui a vida se tocar no inimigo
        if (r2.visible && Math.abs(catX) < somaHalfWidth && Math.abs(catY) < somaHalfHeight)
        {
            r1.vida -= 1;
			r2.visible = false;

            //Funcao para o inimigo reaparecer depois de 1 segundo
			setTimeout(function()
    		{	
				r2.visible = true;
			}, 1000);



        //Math.abs(char.centerX() - friend.centerX()) < char.halfWidth() + friend.halfWidth() && Math.abs(char.centerY() - friend.centerY()) < char.halfHeight() + friend.halfHeight() 
        //r2.visible = false;

        // Funcao para o objeto reaparecer depois de um segundo
        //setTimeout(function()
        //{
        //    r2.visible = true;
        //}, 1000);

        // Bloqueando a passagem
            //var overlapX = somaHalfWidth - Math.abs(catX);
            //var overlapY = somaHalfHeight - Math.abs(catY);
            
            //if(overlapX >= overlapY){//colisão por cima ou por baixo
            //    if(catY > 0){//por cima
            //        r1.y += overlapY;
            //    } else {
            //        r1.y -= overlapY;
            //    }
            //} else {//colisão pela esquerda ou direita
            //    if(catX > 0){//colisão pela esquerda
            //        r1.x += overlapX;
            //    } else {
            //        r1.x -= overlapX;
            //    }
            //}




            //var overlapX = r1.halfWidth() + r2.halfWidth() - Math.abs(char.centerX() - bank.centerX());
            //var overlapY = r1.halfHeight() + r2.halfHeight() - Math.abs(char.centerY() - bank.centerY());
            
            //if(overlapX >= overlapY){//colisão por cima ou por baixo
            //    if(char.centerY() - bank.centerY() > 0){//por cima
            //        char.y += overlapY;
            //    } else {
            //        char.y -= overlapY;
            //    }
            //} else {//colisão pela esquerda ou direita
            //    if(char.centerX() - bank.centerX() > 0){//colisão pela esquerda
            //        char.x += overlapX;
            //    } else {
            //        char.x -= overlapX;
            //    }
            //}

        }
    }
}

function bloqueio(r1,r2)
{
    //r1 - bloqueado
    //r2 - parede
    //catetos

    var catX = r1.centerX() - r2.centerX();
    var catY = r1.centerY() - r2.centerY();

    //Soma das metades
    var somaHalfWidth = r1.halfWidth() + r2.halfWidth();
    var somaHalfHeight = r1.halfHeight() + r2.halfHeight();

    if (r2.visible && Math.abs(catX) < somaHalfWidth && Math.abs(catY) < somaHalfHeight)
    {
        // Bloqueando a passagem
        var overlapX = somaHalfWidth - Math.abs(catX);
        var overlapY = somaHalfHeight - Math.abs(catY);
                
        if(overlapX >= overlapY){//colisão por cima ou por baixo
            if(catY > 0){//por cima
                r1.y += overlapY;
            } else {
                r1.y -= overlapY;
            }
        } else {//colisão pela esquerda ou direita
            if(catX > 0){//colisão pela esquerda
                r1.x += overlapX;
            } else {
                r1.x -= overlapX;
            }
        }
    }



            //var overlapX = r1.halfWidth() + r2.halfWidth() - Math.abs(char.centerX() - bank.centerX());
            //var overlapY = r1.halfHeight() + r2.halfHeight() - Math.abs(char.centerY() - bank.centerY());
            
            //if(overlapX >= overlapY){//colisão por cima ou por baixo
            //    if(char.centerY() - bank.centerY() > 0){//por cima
            //        char.y += overlapY;
            //    } else {
            //        char.y -= overlapY;
            //    }
            //} else {//colisão pela esquerda ou direita
            //    if(char.centerX() - bank.centerX() > 0){//colisão pela esquerda
            //        char.x += overlapX;
            //    } else {
            //        char.x -= overlapX;
            //    }
            //}

}
    
