#!/bin/bash
(cd /root/tdmn.co; git pull)
rm -rf /var/www/tdmn.co
mkdir /var/www/tdmn.co
cp -r /root/tdmn.co/dist/* /var/www/tdmn.co
chown -R www-data:www-data /var/www/tdmn.co
