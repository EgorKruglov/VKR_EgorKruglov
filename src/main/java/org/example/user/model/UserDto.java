package org.example.user.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.example.util.DBmarkers.Create;
import org.example.util.DBmarkers.Update;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserDto {

    private Long id;

    // Данные для регистрации
    @Email(message = "Email should be valid", groups = {Create.class, Update.class})
    @NotBlank(message = "Email cannot be empty", groups = {Create.class, Update.class})
    private String email;

    @Pattern(regexp = "^\\+?[0-9. ()-]{7,25}$", message = "Phone number is invalid", groups = {Create.class, Update.class})
    private String phone;

    @NotBlank(message = "Password cannot be empty", groups = {Create.class, Update.class})
    @Size(min = 8, message = "Password must be at least 8 characters long", groups = {Create.class, Update.class})
    private String password;

    // Данные компании
    @NotBlank(message = "Company name cannot be empty", groups = {Create.class, Update.class})
    @Size(max = 255, message = "Company name is too long", groups = {Create.class, Update.class})
    private String companyName;

    @Size(max = 255, message = "Company name is too long", groups = {Create.class, Update.class})
    private String companyShortName;

    @Pattern(regexp = "^[0-9]{10,12}$", message = "INN is invalid", groups = {Create.class, Update.class})
    @NotBlank(message = "Inn cannot be empty", groups = {Create.class, Update.class})
    private String inn;

    @Pattern(regexp = "^[0-9]{9}$", message = "KPP is invalid",
            groups = {Create.class, Update.class})
    @NotBlank(message = "Kpp cannot be empty", groups = {Create.class, Update.class})
    private String kpp;

    @Pattern(regexp = "^[0-9]{13,15}$", message = "OGRN is invalid",
            groups = {Create.class, Update.class})
    @NotBlank(message = "OGRN cannot be empty", groups = {Create.class, Update.class})
    private String ogrn;

    @NotBlank(message = "Legal address cannot be empty", groups = {Create.class, Update.class})
    @Size(max = 500, message = "Legal address is too long", groups = {Create.class, Update.class})
    private String legalAddress;

    @Size(max = 500, message = "Actual address is too long", groups = {Create.class, Update.class})
    private String actualAddress;

    // Банковские реквизиты
    @NotBlank(message = "Bank account", groups = {Create.class, Update.class})
    @Pattern(regexp = "^[0-9]{20}$", message = "Bank account must be 20 digits",
            groups = {Create.class, Update.class})
    private String bankAccount;

    @NotBlank(message = "Bik cannot be empty", groups = {Create.class, Update.class})
    @Pattern(regexp = "^[0-9]{9}$", message = "BIK must be 9 digits",
            groups = {Create.class, Update.class})
    private String bik;

    @NotBlank(message = "Bank name cannot be empty", groups = {Create.class, Update.class})
    @Size(max = 255, message = "Bank name is too long", groups = {Create.class, Update.class})
    private String bankName;

    @NotBlank(message = "Correspondent account cannot be empty", groups = {Create.class, Update.class})
    @Pattern(regexp = "^[0-9]{20}$", message = "Correspondent account must be 20 digits",
            groups = {Create.class, Update.class})
    private String correspondentAccount;

    // Контактные лица
    @NotBlank(message = "Contact person cannot be empty", groups = {Create.class, Update.class})
    @Size(max = 255, message = "Contact person name is too long",
            groups = {Create.class, Update.class})
    private String contactPerson;

    @Size(max = 255, message = "Contact person position is too long",
            groups = {Create.class, Update.class})
    private String contactPersonPosition;

    @NotBlank(message = "Contact phone cannot be empty", groups = {Create.class, Update.class})
    @Pattern(regexp = "^\\+?[0-9. ()-]{7,25}$", message = "Contact phone is invalid",
            groups = {Create.class, Update.class})
    private String contactPhone;

    @NotBlank(message = "Contact email cannot be empty", groups = {Create.class, Update.class})
    @Email(message = "Contact email should be valid", groups = {Create.class, Update.class})
    private String contactEmail;

    // Дополнительно
    @Size(max = 255, message = "Industry name is too long", groups = {Create.class, Update.class})
    private String industry;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;
}
