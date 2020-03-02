---
title: Getting to grips with Platform.sh workers on your Drupal site
date: '2020-02-26T11:46:36.175Z'
type: post
path: /blog/getting-to-grips-with-platform-sh-workers
draft: false
authors:
  - xavier-mirabelli-montan
---
A site I currently am looking after a website that has a lot of batch processes and API importers.  Historically, these were all set up to utilise cronjobs or a separate Jenkins instance to carry out tasks at a specific time.  If you have a process that takes more than a few minutes, you might have already noticed your deployments are blocked until that cronjob has finished.

After some content updates at the start of the year to one of our APIs, I noticed my import process was being `Killed`.  That was all the information I had no more.  Following a tonne of debugging and profiling, I managed to figure out that it was hitting a memory limit (128mb) on the underlying server processes. This memory limit is due to how Platform.sh separates its resources to handle your web traffic.

In trying to get this API importing again, one of the Platform.sh Support Engineers recommended setting up a worker.  Workers were a new concept to me, but now I understand how they work and how to set them up, most sites I work on will use them.

## So what is a Worker?

According to [Platform.sh's docs](https://docs.platform.sh/configuration/app/workers.html#workers), a worker is as follows:

> A worker instance runs as its own container independently of the web instance and has no Nginx instance running. The router service cannot direct public requests to it, either, so running your own web server on a worker (using Node.js or Go) is not useful.
>
> A worker instance is the exact same code and compilation output as a web instance.

But what does that mean in practice? It means you can create a separate identical instance(s) of your app that don't receive any traffic to do what you wish—awesome!

Oh, and you can have as many as you'd like added!

To experience the joy of a worker, add the following to your `.platform.app.yaml`:

    workers:
      importer:
        size: S
        disk: 256
        commands:
          start: |
            drush import_process -v -d; php scripts/my_import/script.php

Voila! That's it! After you next deploy, the processes that you've defined in the `start` will run in an endless loop.   And, if you've set your database relationships correctly in your `settings.php` it will connect to the database upgrading entries in the background

### If you need to import files...

There is a bit of a kicker if you are importing files and using a `shared` file mount, they are container-specific.   If you need to update files in the `sites/default/files` directory you will need to create a service mount to connect the files between the two containers.

**Warning: this is a destructive operation if you are applying this over an existing shared file mount.**  Make sure you've run `platform mount:download` first locally so that following the deploy you can run `platform mount:upload` once the new service mount is deployed.  

In your `services.yaml` file add the following:

    importer-files:
      type: network-storage:1.0
      disk: 4096

Next, add this new mount to your `.platform.app.yaml`

    mounts:
    	'/web/sites/default/files/importer':
          source: service
          service: importer-files
          source_path: files

What will create a `/files` mount mapped to `/web/sites/default/files/importer`

### All finished

That's it your Platform.sh site will have a separate dedicated container to run your command in the background without locking up processes and deploys on your web contaii

### A few things to note:

1. This file mount, unlike shared mounts, need to have a specified `disk:` attribute in MB.  You might need to upgrade the size of your plan first before deploying the new worker. 
2. Every project has a set number of resources that are shared across all containers and services.   Each time you add a new worker you are taking some of the resources from your other containers including your web container.
3. **There is a bug** when deploying a service mount for the first time and you need to get support to release your stuck deploy.