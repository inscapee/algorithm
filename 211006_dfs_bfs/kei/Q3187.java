import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.LinkedList;
import java.util.Queue;
import java.util.StringTokenizer;

class Node {
    int x;
    int y;

    Node(int x, int y) {
        this.x = x;
        this.y = y;
    }
}

public class Q3187 {

    static int w,h;
    static char[][]map;
    static boolean[][] visited;
//    static int[] dx = {0,0,1,-1};
//    static int[] dy = {1,-1,0,0};
    // 우좌하상

//    static int[] dx = {0, 0, -1, 1};
//    static int[] dy = {-1, 1, 0 , 0};
//    // 좌우상하

    static int[] dx = {0, 0, -1, 1};
    static int[] dy = {-1, 1, 0, 0};
    // 상하좌우


    static int sheep;
    static int wolf;
    static Queue<Node> q = new LinkedList<>();

    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        StringTokenizer st = new StringTokenizer(br.readLine());

        w = Integer.parseInt(st.nextToken());
        h = Integer.parseInt(st.nextToken());

//        w = 6;
//        h = 6;
//        w = 8;
//        h = 8;

        map = new char[w][h];
        visited = new boolean[w][h];

        for (int i = 0; i < w; i++) {
            map[i] = br.readLine().toCharArray();
//            String[] strings = {"...#..", ".##v#.", "#v.#.#", "#.k#.#", ".###.#", "...###"};
//            String[] strings = {".######.", "#..k...#", "#.####.#", "#.#v.#.#", "#.#.k#k#", "#k.##..#", "#.v..v.#", ".######."};
//            map[i] = strings[i].toCharArray();
        }

        for (int i = 0; i < w; i++) {
            for (int j = 0; j < h; j++) {
                if (map[i][j] == '#' || visited[i][j]) {
                    continue;
                }
                solve(i,j);
            }
        }

        System.out.printf("%s%s%s", sheep, " ", wolf);
    }

    static void solve(int x, int y) {
        int v = 0;
        int k = 0;
        visited[x][y] = true;
        q.add(new Node(x, y));

        while(!q.isEmpty()) {
            Node cur = q.poll();

            if(map[cur.x][cur.y] == 'v'){
                v++;
            }
            if (map[cur.x][cur.y] == 'k') {
                k++;
            }

            for (int i = 0; i < dx.length; i++) {
                int ex = cur.x + dx[i];
                int ey = cur.y + dy[i];

                /*
                *
                * . . . # . .
                * . # # v # .
                * # v . # . #
                * # . k # . #
                * . # # # . #
                * . . . # # #
                *
                * */

                if ((!isRange(ex, ey)) || visited[ex][ey] || map[ex][ey] == '#') {
                    continue;
                }

                visited[ex][ey] = true;
                q.add(new Node(ex, ey));
            }
        }

        if(v >= k) {
            wolf += v;
        } else {
            sheep += k;
        }

    }

    static boolean isRange(int x, int y) {
        return x >= 0 && x < w && y >= 0 && y < h;
    }
}
