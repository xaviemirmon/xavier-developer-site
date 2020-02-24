---
title: "Safely De-Duping Files in\_Drupal"
date: '2020-02-11T09:56:54.901Z'
type: post
path: /blog/safely-de-duping-files-in-drupal
draft: false
---
I recently needed to clean up a bunch of on a Drupal site. As a website grows and evolves, the file system can become a bit unruly. As editors upload various versions of the same image and modules change their information architecture the problem grows and grows. The largest culprit of this for me was poorly architected API import which, once fixed, left me with gigabytes of unused images.

There are many modules out there that say they aim to fix this issue. However, I found that a lot of them were all based on the file_managed table in your database. I found using these modules also deleted files needed for the site.

### The solution

Solving this problem wasn’t very straightforward, but I managed to find a foolproof solution that fixed this error that works for Drupal 7 and 8. The solution involved a mixture of AWS S3, the Stage File Proxy module, and a good SEO crawler (SEMRush in my instance). Using this technique, I managed to shave about 15GB off of my filesystem — a considerable saving!

### How to do it!

#### Setting up your S3 bucket

1. Create a backup of your entire Drupal filesystem
2. Upload this backup to AWS S3. Ensure that your bucket setup has the identical directory structure to the rest of your site, e.g. __/sites/default/files/*__.
3. Now expose your bucket to the outside world. You can do this by going into the bucket on your AWS console, then select the following from the tabs at the top Properties > Static website hosting > Use this bucket to host a website > Save.
4. AWS will now provide an HTTP endpoint. Note this down for later.

![](https://cdn-images-1.medium.com/max/1760/1*9wutRSlMZm-6YGasbx8iTw.png)

### Install and setup Stage File Proxy

1. Now you will need to download and install [Stage File Proxy](https://www.drupal.org/project/stage_file_proxy) onto your site.
2. Configure your settings.php or settings.yml to point the endpoint of your AWS bucket. Or, use drush

   Drupal 7:

       drush variable-set stage_file_proxy_origin "http://[your-aws-endpoint].amazonaws.com"

   Drupal 8:

       drush config-set stage_file_proxy.settings origin "http://[your-aws-endpoint].amazonaws.com"
3. Deploy this to your production site.

### Delete all your files

Navigate to the filesystem on the PROD environment of your site then run the following command:

    rm -Rf sites/default/files/*

Yes, that is correct your eyes aren’t deceiving you. Delete all your files on the PROD website. Without any files, Stage File Proxy can kick in and download the files that your site needs on each page load from the S3 bucket.

### _Optional:_ Crawl the site

Stage File Proxy relies on `hook_init()` to fetch your files down which will have a performance impact on the TTFB for the first load of each page. For an image-heavy site or to simply mitigate the degradation for your users, you can crawl the site to download/warm the files preemptively. I used SEMRush’s crawler but any crawler such as Screaming Frog, Raven, or ScrapeStorm will do.

### Scale back your storage

Finally, you can safely scale back the storage and save all the monies.