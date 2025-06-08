package org.example.user.model;

import lombok.experimental.UtilityClass;

@UtilityClass
public class UserDtoMapper {
    public User dtoToUser(UserDto userDto) {  // исключен время создания/обновления
        return User.builder()
                .id(userDto.getId())
                .email(userDto.getEmail())
                .phone(userDto.getPhone())
                .password(userDto.getPassword())
                .companyName(userDto.getCompanyName())
                .companyShortName(userDto.getCompanyShortName())
                .inn(userDto.getInn())
                .kpp(userDto.getKpp())
                .ogrn(userDto.getOgrn())
                .legalAddress(userDto.getLegalAddress())
                .actualAddress(userDto.getActualAddress())
                .bankAccount(userDto.getBankAccount())
                .bik(userDto.getBik())
                .bankName(userDto.getBankName())
                .correspondentAccount(userDto.getCorrespondentAccount())
                .contactPerson(userDto.getContactPerson())
                .contactPersonPosition(userDto.getContactPersonPosition())
                .contactPhone(userDto.getContactPhone())
                .contactEmail(userDto.getContactEmail())
                .industry(userDto.getIndustry())
                .build();
    }

    public UserDto userToDto(User user) {  // исключен пароль, телефон, время создания/обновления
        return UserDto.builder()
                .id(user.getId())
                .email(user.getEmail())
                .companyName(user.getCompanyName())
                .companyShortName(user.getCompanyShortName())
                .inn(user.getInn())
                .kpp(user.getKpp())
                .ogrn(user.getOgrn())
                .legalAddress(user.getLegalAddress())
                .actualAddress(user.getActualAddress())
                .bankAccount(user.getBankAccount())
                .bik(user.getBik())
                .bankName(user.getBankName())
                .correspondentAccount(user.getCorrespondentAccount())
                .contactPerson(user.getContactPerson())
                .contactPersonPosition(user.getContactPersonPosition())
                .contactPhone(user.getContactPhone())
                .contactEmail(user.getContactEmail())
                .industry(user.getIndustry())
                .roles(user.getRoles())
                .build();
    }
}
