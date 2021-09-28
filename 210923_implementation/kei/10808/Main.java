import java.util.Scanner;
import java.util.StringJoiner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        StringJoiner sj = new StringJoiner(" ");
        int[] c = new int[26];

        String s = sc.nextLine();
        for (int i = 0; i < s.length(); i++) {
            c[s.charAt(i)-97]++;
        }

        for (int i = 0; i < c.length; i++) {
            sj.add(Integer.toString(c[i]));
        }

        System.out.println(sj);
    }
}
