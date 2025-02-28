import java.awt.*;
import java.awt.event.*;
import java.util.ArrayList;
import java.util.Random;
import javax.swing.*;



class Game extends JPanel implements ActionListener,KeyListener{
    private class Tile {
        int x,y;
        public Tile(int x,int y)
        {
            this.x=x;
            this.y=y;
        }
    }

    int boardHeight,boardWidth;
    int titleSize=25;

    //snake
    Tile snakeHead;
    ArrayList<Tile> snakeBody;

    //food
    Tile food;
    Random random;

    //game logic
    Timer gameLoop; 
    int velocityX;
    int velocityY;
    boolean gameOver=false;

    public Game(int boardHeight,int boardWidth)
    {
        this.boardHeight=boardHeight;
        this.boardWidth=boardWidth;
        setPreferredSize(new Dimension(this.boardWidth,this.boardHeight));
        setBackground(Color.black);
        addKeyListener(this);
        setFocusable(true);

        snakeHead=new Tile(5,5);
        snakeBody=new ArrayList<Tile>();

        food=new Tile(10,10);
        random=new Random();
        placeFood();

        velocityX=0;
        velocityY=1;

        gameLoop=new Timer(100,this);
        gameLoop.start();
    }
    private void draw(Graphics g)
    {
        /* 
        for(int i=0;i< boardWidth/titleSize;i++) {
            // x1 y1 x2 y2
            g.drawLine(i*titleSize,0,i*titleSize,boardHeight);
            g.drawLine(0,i*titleSize,boardWidth,i*titleSize);
        }
        */
        //food
        g.setColor(Color.red);
        //g.fillRect(food.x*titleSize, food.y*titleSize, titleSize, titleSize);
        g.fill3DRect(food.x*titleSize, food.y*titleSize, titleSize, titleSize,true);

        //snake head
        g.setColor(Color.green);
        //g.fillRect(snakeHead.x*titleSize , snakeHead.y*titleSize ,titleSize,titleSize);
        g.fill3DRect(snakeHead.x*titleSize , snakeHead.y*titleSize ,titleSize,titleSize,true);

        //snake body
        for(Tile tile:snakeBody)
        {
            //g.fillRect(tile.x*titleSize, tile.y*titleSize, titleSize,titleSize);
            g.fill3DRect(tile.x*titleSize, tile.y*titleSize, titleSize,titleSize,true);
        }

        //score
        g.setFont(new Font("Arial",Font.PLAIN,16));
        if(gameOver) 
        {
            g.setColor(Color.red);
            g.drawString("Game Over: " +String.valueOf(snakeBody.size()),titleSize-16,titleSize);
        }
        else
        {
            g.drawString("Score: "+String.valueOf(snakeBody.size()), titleSize-16, titleSize);
        }
    }
    public void paintComponent(Graphics g)
    {
        super.paintComponent(g);
        draw(g);
    }
    private void placeFood()
    {
        food.x=random.nextInt(boardWidth/titleSize); //[0,23]
        food.y=random.nextInt(boardHeight/titleSize);
    }
    private boolean collision(Tile a,Tile b)
    {
        return a.x==b.x && a.y==b.y;
    }
    private void move()
    {
        if(collision(snakeHead, food)) 
        {
            snakeBody.add(new Tile(food.x,food.y));
            placeFood();
        }

        //snake body
        for(int i=snakeBody.size()-1;i>=0;i--)
        {
            Tile snakePart=snakeBody.get(i);
            if(i==0)
            {
                snakePart.x=snakeHead.x;
                snakePart.y=snakeHead.y;
            }
            else
            {
                Tile prevSnakePart= snakeBody.get(i-1);
                snakePart.x= prevSnakePart.x;
                snakePart.y= prevSnakePart.y;
            }
        }

        snakeHead.x+=velocityX;
        snakeHead.y+=velocityY;

        //gameover Conditions
        for(Tile t:snakeBody)
        {
            if(collision(snakeHead, t))
            {
                gameOver=true;
            }
        }
        if(snakeHead.x*titleSize<0 || snakeHead.y*titleSize<0 || snakeHead.x*titleSize> boardWidth || snakeHead.y*titleSize>boardHeight)
        {
            gameOver=true;
        }
    }
    public void actionPerformed(ActionEvent e) {
        move();
        repaint();
        if(gameOver)
        {
            gameLoop.stop();
        }
    }
    @Override
    public void keyPressed(KeyEvent e) {
        if(e.getKeyCode()== KeyEvent.VK_UP && velocityY!=1)
        {
            velocityX=0;
            velocityY=-1;
        }
        else if(e.getKeyCode()== KeyEvent.VK_DOWN && velocityY!=-1)
        {
            velocityX=0;
            velocityY=1;
        }
        else if(e.getKeyCode()== KeyEvent.VK_LEFT && velocityX!=1)
        {
            velocityX=-1;
            velocityY=0;
        }
        else if(e.getKeyCode()== KeyEvent.VK_RIGHT && velocityX!=-1)
        {
            velocityX=1;
            velocityY=0;
        }
    }
    @Override
    public void keyTyped(KeyEvent e) {}
    @Override
    public void keyReleased(KeyEvent e) {}

}
