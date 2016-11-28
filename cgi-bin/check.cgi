#!/usr/bin/python
# coding: utf-8

import cgi, smtplib, time

if __name__ == "__main__":

    print "Content-type:text/html\n"

    template = open('template.html', 'r').read().decode('utf8')

    form = cgi.FieldStorage(keep_blank_values = True)

    authorName  = form.getvalue('name').decode('utf8')
    fromEmail   = form.getvalue('email')
    # toEmail      = "michael.krishtopa@gmail.com"
    toEmail      = "chornobay@ukr.net"
    date = time.ctime(time.time())
    subject = form.getvalue('subject').decode('utf8')
    message = form.getvalue('message').decode('utf8')

    mailBody = u"""From: %s <%s>
To: Чернобай Александр Евгеньевич <%s>
Date: %s
Subject: lawyers.kharkiv.ua лендинг: %s
Content-Type: text/plain; charset=\"Windows-1251\"

%s
""" % (authorName, fromEmail, toEmail, date, subject, message)

    mailBody = mailBody.encode('cp1251')
    server = smtplib.SMTP("localhost")
    server.sendmail(fromEmail, toEmail, mailBody)
    server.quit()

    content = u"Ваше сообщение отправлено. Ожидайте, мы с вами свяжемся в кратчайшие сроки."

    print (template % (content)).encode('utf8')
