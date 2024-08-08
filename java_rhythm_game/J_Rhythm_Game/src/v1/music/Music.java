package v1.music;

import java.io.BufferedInputStream;
import java.io.File;
import java.io.FileInputStream;

import javazoom.jl.player.Player;
import v1.run.Main;



// 곡을 재생해주는 하나의 작은 프로그
public class Music extends Thread {

	private Player player;
	private boolean isLoop;
	private File file;
	private FileInputStream fis;
	private BufferedInputStream bis;
	
	public Music(String name, boolean isLoop) {
		try {
			this.isLoop = isLoop;
			file = new File(Main.class.getResource("../../musics/" + name).toURI());
			fis = new FileInputStream(file);
			bis = new BufferedInputStream(fis);
			player = new Player(bis);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	// 현재 음악이 어디서 실행되고 있는지
	public int getTime() {
		if (player == null) {
			return 0;
		} 
		return player.getPosition();
	}
	
	// 음악을 항상 종료할 수 있도록
	public void close() {
		isLoop = false;
		player.close();
		this.interrupt();
	}

	@Override
	public void run() {
		try {
			// 곡은 일단 실행
			do {
				player.play();
				fis = new FileInputStream(file);
				bis = new BufferedInputStream(fis);
				player = new Player(bis);
			} while (isLoop);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	
}
