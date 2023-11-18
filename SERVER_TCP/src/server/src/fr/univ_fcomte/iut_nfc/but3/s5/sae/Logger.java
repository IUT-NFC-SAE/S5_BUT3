package fr.univ_fcomte.iut_nfc.but3.s5.sae;

import org.bson.Document;

public class Logger {
    private static void log(Boolean newLine, String className, String moduleName, String message, Object data, Color color){
        if(color == null) color = Color.WHITE;
        // NAME
        String log = color.getBold() + "[" + className;
        log += moduleName != null ? ":" + moduleName + "]" : "]";
        // MESSAGE
        log += color.get() + (message != null ? " "+ message + " " : " ");
        // DATA
        if(data != null){
            log += "->\033[0m ";
            if (data instanceof Document document) {
                System.out.print(log);
                System.out.print(document.toJson());
            } else {
                log += (String)data;
                System.out.print(log);
            }
        } else {
            System.out.print(log);
        }
        // NEW LINE
        if(newLine) System.out.println();
    }

    public static void print(String className, String moduleName, String message, Object data, Color color){
        Logger.log(false,className,moduleName,message,data,color);
    }

    public static void println(String className, String moduleName, String message, Object data, Color color){
        Logger.log(true,className,moduleName,message,data,color);
    }

    public enum Color {
        BLACK(0),
        RED(1),
        GREEN(2),
        YELLOW(3),
        BLUE(4),
        PURPLE(5),
        CYAN(6),
        WHITE(7);

        private final int value;
        Color(int value) {this.value = value;}
        public String get() {return "\033[0;3"+value+"m";}
        public String getBold() {return "\033[1;3"+value+"m";}
        public String getUnderline() {return "\033[4;3"+value+"m";}
        public String getBackground() {return "\033[4"+value+"m";}
    }

}
