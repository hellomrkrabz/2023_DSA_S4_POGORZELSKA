from . import mail
from flask_mail import Mail
from flask_mail import Message
from .html_proccesors import html_attr_inputter, html_proccesor

def send_mail_with_msg(target_email, title, msg_body):
    msg = Message(title, recipients = [target_email])
    msg.body = msg_body
    mail.send(msg)
    print("Email '"+title+"' sent to: '"+target_email+"'")

def send_mail_with_html(target_email, title, html_body):
    msg = Message(title, recipients = [target_email])
    msg.html = html_body
    mail.send(msg)
    print("Email '"+title+"' sent to: '"+target_email+"'")

def send_mail_from_html_file(target_email, title, filename, html_proccesor_instace=None):
    html_file = open('../src/email_htmls/'+filename, 'r')
    html_string = html_file.read()

    for procesor in html_proccesor_instace:
        if issubclass(type(procesor), html_proccesor):
            print("Performing html processing")
            html_string = procesor.procces_html(html_string)

    msg = Message(title, recipients = [target_email])
    msg.html = html_string
    print(html_string)
    mail.send(msg)
    print("Email '"+title+"' sent to: '"+target_email+"'")