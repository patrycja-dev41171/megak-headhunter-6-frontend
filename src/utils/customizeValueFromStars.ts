export const customizeValueFromStars = (val: number | null) => {
    switch (val) {
        case 0:
            return null;

        case 1:
            return 5;

        case 2:
            return 4;

        case 3:
            return 3;

        case 4:
            return 2;

        case 5:
            return 1;

        case null:
            return null;
    }
};