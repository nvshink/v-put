<template>
    <div class=" d-flex flex-column align-items-center main">
        <div class="loading-icon">
            <svg width="50" height="55" viewBox="0 0 76 72" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M38.5 71.5L0.64153 2.97138C-0.0948705 1.6384 0.866935 0 2.3898 0H23.0044C23.8912 0 24.6721 0.583956 24.9228 1.43457L38.5 47.5L51.0971 1.47205C51.335 0.602774 52.1249 0 53.0262 0H73.6516C75.1649 0 76.1278 1.61982 75.4103 2.95228L38.5 71.5Z"
                    fill="url(#paint0_linear_72_5)" />
                <defs>
                    <linearGradient id="paint0_linear_72_5" x1="6.02" y1="2.86" x2="70.8395" y2="73.5722"
                        gradientUnits="userSpaceOnUse">
                        <stop stop-color="#5E5BF9" />
                        <stop offset="1" stop-color="#FFAF66" />
                    </linearGradient>
                </defs>
            </svg>
        </div>
        <h3>Загрузка</h3>
    </div>
</template>
<style lang="scss" scoped>
@keyframes orbit {
    from {
        transform: rotate(360deg);
    }

    to {
        transform: rotate(0deg);
    }
}

.loading-icon {
    width: 100px;
    height: 80px;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
    animation-name: orbit;
    animation-duration: 3s;
    margin: 40px;
}
.main {
    margin-top: 50%;
}
</style>