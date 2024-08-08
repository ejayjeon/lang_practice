package v1.frame;

import java.awt.Graphics;
import java.awt.Image;

import javax.swing.ImageIcon;
import javax.swing.JFrame;

import v1.music.Music;
import v1.run.Main;

public class JBeat extends JFrame{

	private static final long serialVersionUID = 1L;
	
	// 더블 버퍼링: 매순간 버퍼에 이미지를 불러옴
	private Image screenImage;
	private Image introImage;
	private Graphics screenGraphic;
	
	public JBeat() {
		
		// 게임 타이틀
		setTitle("J Beat");
		
		// 게임 사이즈
		setSize(Main.SCREEN_WIDTH, Main.SCREEN_HEIGHT);
		setResizable(true);
		setLocationRelativeTo(null);
		setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		setVisible(true);
		
		// Main 클래스의 위치를 기반으로 리소스(이미지)를 
		introImage = new ImageIcon(Main.class.getResource("../../images/intro.jpg")).getImage();
		
		// 뮤직 실행 (쓰레드)
		Music introMusic = new Music("ditto.mp3", true);
		introMusic.start();
	}
	
	// GUI에서 가장 첫 번째로 화면을 그려주는 함수
	public void paint(Graphics g) {
		// 1. 이미지 사이즈 (프로그램 화면 크기만큼)
		screenImage = createImage(Main.SCREEN_WIDTH, Main.SCREEN_HEIGHT);
		// 2. 이미지에서 그래픽을 불러온
		screenGraphic = screenImage.getGraphics();
		
		// 3. screenDraw 메소드
		screenDraw(screenGraphic);
		
		// 4. 이미지 그리기
		g.drawImage(screenImage, 0, 0, null);
	};
	
	public void screenDraw(Graphics g) {
		// 이미지는 0, 0에 그려줌
		g.drawImage(introImage, 0, 0, null);
		this.repaint();
	};

}
