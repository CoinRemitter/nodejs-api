
/**
 * A common file for common functions
 */

/**
 *
 *  @IsValidJSONString : It will check if given string is json or not
 */
module.exports = {
    IsValidJSONString: function (jsonString) {
        try {
            JSON.parse(jsonString);
        } catch (e) {
            return false;
        }
        return true;
    }
};