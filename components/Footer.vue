<template>
    <footer class="footer mt-3">
        <div class="text-center">
            <div class="copyright">
                <p>© <span>2020</span> <a href="http://www.smartbios.cl" target="_blank" class="transition">SmartBiOS</a> All rights reserved.</p>
            </div>
        </div>        
    </footer>
</template>

<style scoped>
a:hover{
    text-decoration:none;
}
.footer {
    padding: 60px 0;
    background-color: #011213;
}
.footer .copyright  {
    color: #e5e5e5;
    font-weight: 600;
}
.copyright a {
    color: #f2ff49;
    margin-left: 3px;
    padding-right: 3px;
}
.footer p {
    margin-bottom: 0;
    line-height: 50px;
    font-size: 16px;
    font-weight: 400;
}
.copyright p span {
    color: #d1caca;
}
.footer .copyright p, .footer .copyright a:hover{
    color: #6c6d83;
}
</style>