#include <mysql.h>
#include <stdio.h>
#include <string.h>
#include <stdlib.h>

my_bool mail_init(UDF_INIT *initid, UDF_ARGS *args, char *message) {
        initid->maybe_null = 0;

        return 0;
}

long long mail(UDF_INIT *initid, UDF_ARGS *args,
               char *is_null, char *error) {
        char *prg;
        FILE *p;
        int i;

        if (args->arg_count != 2) {
                strcpy(error, "MAIL() needs receipient and body");
                return 1;
        }

        if (args->arg_type[0] != STRING_RESULT ||
            args->arg_type[1] != STRING_RESULT) {
                strcpy(error, "MAIL() needs receipient and body as string");
                return 1;
        }

        for (i = 0; i < args->lengths[0]; i++) {
                char c = args->args[0][i];

                if (!((c >= 'a' && c <= 'z') ||
                      (c >= 'A' && c <= 'Z') ||
                      (c == '@') ||
                      (c == '.') ||
                      (c >= '0' && c <= '9') ||
                      (c == '-' ) ||
                      (c == '_' ))) {
                        strcpy(error, "the receipient contains a illegal char");

                        return -1;
                }
        }

        prg = malloc(strlen("/usr/lib/sendmail ") + args->lengths[0] + 1);
        strcpy(prg, "/usr/lib/sendmail ");
        strcat(prg, args->args[0]);


        p = popen(prg, "w");

        free(prg);

        if (NULL == p) {
                strcpy(error, "opening pipe failed");
                return -1;
        }


        fwrite(args->args[1], args->lengths[1], 1, p);
        fclose(p);


        *is_null = 0;
        *error = 0;

        return 0;
}