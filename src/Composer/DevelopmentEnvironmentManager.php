<?php

namespace Kunstmaan\CookieBundle\Composer;

use Symfony\Component\Filesystem\Filesystem;

class DevelopmentEnvironmentManager 
{
    public static function setup()
    {
        $fileSystem = new FileSystem();
    
        $fileSystem->symlink(getcwd().'/pre-commit', getcwd().'/.git/hooks/pre-commit');
    }
}